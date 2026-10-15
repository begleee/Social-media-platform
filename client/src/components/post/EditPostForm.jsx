import { Button } from "#components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#components/ui/card";
import { Field, FieldGroup, FieldLabel } from "#components/ui/field";
import { Input } from "#components/ui/input";
import { Textarea } from "#components/ui/textarea";
import { toast } from "#components/ui/toast";
import { useForm } from "react-hook-form";
import { useEditPost } from "../../hooks/usePosts";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "#components/ui/carousel";
import { ImageOff } from "lucide-react";
import { useNavigate } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  title: z.string().min(7),
  deteails: z.string()
});

export default function EditPostForm({ post }) {
  const navigate = useNavigate();
  const { mutate, isPending } = useEditPost();

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: post?.title || "",
      details: post?.details || "",
    },
  });

  const watchedTitle = watch("title");
  const watchedDetails = watch("details");

  const isSubmitAvailable =
    watchedTitle !== (post?.title || "") ||
    watchedDetails !== (post?.details || "");

  const onSubmit = handleSubmit(async (data) => {
    const payload = {
      postId: post.id,
      title: data.title,
      details: data.details,
    };

    mutate(payload, {
      onSuccess: () => {
        reset();
        toast.add({ description: "Post updated successfully." });
        navigate(-1);
      },
      onError: (err) => {
        toast.add({ description: err.message || "Failed to update post." });
      },
    });
  });

  return (
    <Card className="w-full max-w-md mx-auto rounded-xl border shadow-sm overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Edit Post</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit}>
          <FieldGroup>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted border">
              <div className="absolute inset-0 z-20 bg-black/25 pointer-events-none" />

              {post?.imageUrls && post.imageUrls.length > 0 ? (
                <Carousel className="w-full h-full">
                  <CarouselContent className="ml-0 h-full">
                    {post.imageUrls.map((image) => (
                      <CarouselItem key={image.id} className="pl-0 h-full">
                        {image.url && (
                          <img
                            src={image.url}
                            alt={post.title || "Post image"}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {post.imageUrls.length > 1 && (
                    <>
                      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-30 h-8 w-8 bg-background/80 backdrop-blur-sm" />
                      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-30 h-8 w-8 bg-background/80 backdrop-blur-sm" />
                    </>
                  )}
                </Carousel>
              ) : (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-muted/60 text-muted-foreground p-4 text-center">
                  <ImageOff className="mb-2 h-5 w-5 opacity-60" />
                  <span className="text-xs font-medium">No Image Attached</span>
                </div>
              )}
            </div>

            <Field>
              <FieldLabel htmlFor="title" className="text-xs sm:text-sm font-medium">
                Post Title
              </FieldLabel>
              <Input
                {...register("title")}
                id="title"
                placeholder="Enter a post title"
                className="w-full text-sm"
              />
            {errors.title && <div className='text-red-500'>{errors.title.message}</div>}
            </Field>

            <Field>
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
            {errors.details && <div className='text-red-500'>{errors.details.message}</div>}

            <div className="flex flex-col items-center gap-2">
              <Button
                type="submit"
                disabled={isPending || !isSubmitAvailable}
                className="w-full"
              >
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
