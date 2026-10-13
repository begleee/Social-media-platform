import { Button } from '#components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '#components/ui/card'
import { Field, FieldGroup, FieldLabel } from '#components/ui/field'
import { Input } from '#components/ui/input'
import { Textarea } from '#components/ui/textarea'
import { UploadCloud, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useCreatePost } from '../../hooks/usePosts'
import { toast } from '#components/ui/toast'
import { useEffect, useRef, useState } from 'react'

export default function CreatePostForm() {
  const { mutate, isPending } = useCreatePost();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const fileInputRef = useRef(null);
  const { register, handleSubmit, reset } = useForm();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));

    setSelectedFiles((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...newPreviewUrls]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(previews[index]);
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const cleanupPreviews = () => {
    previews.forEach((url) => URL.revokeObjectURL(url));
    setSelectedFiles([]);
    setPreviews([]);
  };

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("details", data.details);

    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    mutate(formData, {
      onSuccess: () => {
        reset();
        cleanupPreviews();
        toast.add({ description: "Post has been created." });
      },
      onError: (err) => {
        toast.add({ description: err.message || "Failed to create post." });
      },
    });
  });

  return (
    <Card className="w-full max-w-md mx-auto rounded-xl border shadow-sm">
      <CardHeader className="p-4 sm:p-6 pb-2">
        <CardTitle className="text-lg font-semibold">Create Post</CardTitle>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 pt-2">
        <form onSubmit={onSubmit}>
          <FieldGroup className="space-y-4">
            <Field className="space-y-1.5">
              <FieldLabel htmlFor="title" className="text-xs sm:text-sm font-medium">
                Post Title
              </FieldLabel>
              <Input
                {...register("title", { required: true })}
                id="title"
                placeholder="Enter a post title"
                className="w-full text-sm"
              />
            </Field>

            <Field className="space-y-1.5">
              <FieldLabel htmlFor="details" className="text-xs sm:text-sm font-medium">
                Post details
              </FieldLabel>
              <Textarea
                {...register("details")}
                id="details"
                placeholder="Write your post details here..."
                rows={3}
                className="w-full text-sm resize-none"
              />
            </Field>

            <Field className="space-y-2">
              <FieldLabel
                htmlFor="images"
                className="flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors hover:bg-muted/50 border-muted-foreground/25"
              >
                <UploadCloud className="h-8 w-8 text-muted-foreground" />
                <div className="space-y-0.5">
                  <p className="text-xs sm:text-sm font-medium">
                    Upload images
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    PNG, JPG, or WEBP up to 10MB
                  </p>
                </div>
              </FieldLabel>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                id="images"
                onChange={handleFileChange}
              />

              {previews.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-2">
                  {previews.map((preview, index) => (
                    <div
                      key={index}
                      className="relative aspect-square group rounded-lg overflow-hidden border bg-muted"
                    >
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-black/70 hover:bg-black text-white rounded-full p-1 transition-opacity"
                        aria-label="Remove image"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Field>

            <Field className="pt-2">
              <Button disabled={isPending} type="submit" className="w-full">
                {isPending ? "Posting..." : "Post"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};
