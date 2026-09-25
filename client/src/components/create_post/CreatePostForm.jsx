import { Button } from '#components/ui/button'
import { Card, CardContent } from '#components/ui/card'
import { Field, FieldGroup, FieldLabel } from '#components/ui/field'
import { Input } from '#components/ui/input'
import { Textarea } from '#components/ui/textarea'
import { UploadCloud } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useCreatePost } from '../../hooks/usePosts'
import { toast } from '#components/ui/toast'
import { useRef, useState } from 'react'

export default function CreatePostForm() {
    const { mutate, isPending } = useCreatePost();
    const [ previews, setPreviews ] = useState([]);

    const fileInputRef = useRef(null);
    const { register, handleSubmit, reset } = useForm();

    const { ref: registerRef, onChange: registerOnchange, ...registerRest } = register("images");

    const handleFileChange = (e) => {
        registerOnchange(e);
        const files = e.target.files;

        if(files) {
            const newPreviews = [];
            for(let i = 0; i < files.length; i++) {
                const objecUrl = URL.createObjectURL(files[i]);
                newPreviews.push(objecUrl);
            }
            setPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const onSubmit = handleSubmit(async (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("details", data.details);

        if(data.images && data.images.length > 0) {
            for(let i = 0; i < data.images.length; i++) {
                formData.append("images", data.images[i]);
            };
        }

        mutate(formData, {
            onSuccess: () => {
                reset();
                toast.add({ description: "Post has been created." });
                setPreviews([]);
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
                            {...registerRest}
                            type="file"
                            multiple
                            className="hidden"
                            id="images"
                            ref={registerRef}
                            onChange={handleFileChange}
                        />
                        <div className='flex gap-3'>
                            {previews && previews.map((preview, index) => (
                                <img 
                                    key={index}
                                    src={preview} 
                                    alt="Preview" 
                                    className='max-w-32'
                                />
                            ))}
                        </div>
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
