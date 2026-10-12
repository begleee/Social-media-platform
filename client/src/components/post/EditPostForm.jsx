import { Button } from "#components/ui/button";
import { Card, CardContent } from "#components/ui/card";
import { FieldGroup } from "#components/ui/field";
import { Input } from "#components/ui/input";
import { Field, FieldLabel } from "#components/ui/field";
import { Textarea } from "#components/ui/textarea";
import { toast } from "#components/ui/toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEditPost } from "../../hooks/usePosts";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "#components/ui/carousel";
import { ImageOff } from "lucide-react";
import { Skeleton } from "#components/ui/skeleton";
import { useNavigate } from "react-router";

export default function EditPostForm({ post }) {
    const navigate = useNavigate();
    const { mutate, isPending } = useEditPost();
    const [ titleInputValue, setTitleInputValue ] = useState(post.title);
    const [ detailsInputValue, setDetailsInputValue ] = useState(post.details);

    const { register, handleSubmit, reset } = useForm();

    function handleTitleChange(e) {
        setTitleInputValue(e.target.value);
    };

    function handleDetailsChange(e) {
        setDetailsInputValue(e.target.value);
    };

    const onSubmit = handleSubmit(async (data) => {
        const obj = {
            postId: post.id,
            title: data.title,
            details: data.details
        }

        mutate(obj, {
            onSuccess: () => {
                reset();
                toast.add({ description: "Post has been edited successfully." });
                navigate(-1);
            },
            onError: (err) => {
                toast.add({ description: err.message });
            }
        });
    });

    const isSumbitAvailable = post.title !== titleInputValue || post.details !== detailsInputValue;
    return (
        <Card className="w-[50%] self-center">
            <CardContent>
                <form onSubmit={onSubmit}>
                    <FieldGroup>
                        <Field>
                            <div className="relative aspect-video w-full">
                                <div className="absolute inset-0 z-20 bg-black/35 pointer-events-none" />

                                {post.imageUrls && post.imageUrls.length > 0 ? (
                                    <Carousel className="w-full h-full">
                                        <CarouselContent className="ml-0 h-full">
                                            {post.imageUrls.map((image) => (
                                                <CarouselItem key={image.id} className="pl-0 h-full">
                                                    {image.url && <img 
                                                        src={image.url}
                                                        alt="" 
                                                        className="w-full h-full object-cover"
                                                    />}
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        
                                        {post.imageUrls.length > 1 && (
                                            <>
                                                <CarouselPrevious className="absolute left-4 top-1/2 z-30" />
                                                <CarouselNext className="absolute right-4 top-1/2 z-30" />
                                            </>
                                        )}
                                    </Carousel>
                                ) :  <>
                                    <div className="absolute inset-0 z-20 bg-black/35 pointer-events-none">
                                        <div className="flex h-full w-full flex-col items-center justify-center " to={post.id}>
                                            <ImageOff className="mb-1 h-4 w-4 opacity-50" />
                                            <span>No Image</span>
                                        </div>
                                    </div>
                                    <Skeleton className="w-xl h-xl"/>
                                </>}
                            </div>
                            <FieldLabel htmlFor="title">Post Title</FieldLabel>
                            <Input {...register("title")} onChange={handleTitleChange} id="title" defaultValue={titleInputValue} placeholder="Write your post post title"/>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="details">
                                Post details
                            </FieldLabel>
                            <Textarea {...register("details")} onChange={handleDetailsChange} id="details" defaultValue={detailsInputValue} placeholder="Write your post details here"/>
                            <Button disabled={isPending || !isSumbitAvailable} type="submit">Edit</Button>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
};
