import { Button } from '#components/ui/button'
import { Card, CardContent } from '#components/ui/card'
import { Field, FieldGroup, FieldLabel } from '#components/ui/field'
import { Input } from '#components/ui/input'
import { Textarea } from '#components/ui/textarea'
import { UploadCloud } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useCreatePost } from '../../hooks/usePosts'
import { toast } from '#components/ui/toast'
import { useRef } from 'react'

export default function CreatePostForm() {
    const { mutate, isPending } = useCreatePost();
    const fileInputRef = useRef(null);
    const { register, handleSubmit, reset } = useForm();

    const { ref: registerFileRef, ...photosRegister } = register("photos");

    const onSubmit = handleSubmit(async (data) => {
        mutate(data, {
            onSuccess: () => {
                reset();
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
                            htmlFor="photos" 
                            className="
                            flex flex-col 
                            border-2 border-dashed rounded-xl 
                            p-8 text-center cursor-pointer transition-all
                            hover:bg-secondary"
                        >
                            <p>Choose the photos you'd like to post</p>
                            <UploadCloud/> 
                        </FieldLabel>
                        <Input 
                            {...photosRegister}
                            {...register("photos")}
                            type="file"
                            multiple
                            className="hidden"
                            ref={(e) => {
                                registerFileRef(e);
                                fileInputRef.current = e;
                            }}
                        />
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
