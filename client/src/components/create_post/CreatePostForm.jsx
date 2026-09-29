import { Button } from '#components/ui/button'
import { Card, CardContent } from '#components/ui/card'
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
    const [ selectedFiles, setSelectedFiles ] = useState([]);
    const [ previews, setPreviews ] = useState([]);

    const fileInputRef = useRef(null);
    const { register, handleSubmit, reset } = useForm();


    const handleFileChange = (e) => {
        const files = Array.from(e.target.files || []);
        if(!files.length) return;

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
            previews.forEach((url) => URL.revokeObjectURL(url))
        }
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
                toast.add({ description: err.message });
            }
        });
    });

    return (
    <Card className="w-[50%] self-center">
        <CardContent>
            <form onSubmit={onSubmit}>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="title">Post Title</FieldLabel>
                        <Input {...register("title")} id="title" placeholder="Enter a post title"/>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="details">
                            Post details
                        </FieldLabel>
                        <Textarea {...register("details")} id="details" placeholder="Write your post details here"/>
                    </Field>
                    <Field>
                        <FieldLabel 
                            onClick={() => fileInputRef.current?.click()}
                            htmlFor="images" 
                            className="
                            flex flex-col 
                            border-2 border-dashed rounded-xl 
                            p-8 text-center cursor-pointer transition-all
                            hover:bg-secondary"
                        >
                            <p>Choose the images you'd like to post</p>
                            <UploadCloud/> 
                        </FieldLabel>
                        <input
                            type="file"
                            multiple
                            className="hidden"
                            id="images"
                            onChange={handleFileChange}
                        />
                        {previews.length > 0 && (
                            <div className='flex gap-3'>
                                {previews.map((preview, index) => (
                                    <div key={index} className="relative group rounded-lg overflow-hidden border">
                                        <img 
                                            src={preview} 
                                            alt={`Preview ${index + 1}`} 
                                            className="w-24 h-24 object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-80 hover:opacity-100"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Field>
                    <Field>
                        <Button disabled={isPending} type="submit">Post</Button>
                    </Field>
                </FieldGroup>
            </form>
        </CardContent>
    </Card>
    )
};
