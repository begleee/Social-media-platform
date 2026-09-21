import { Button } from '#components/ui/button'
import { Card, CardContent } from '#components/ui/card'
import { Field, FieldGroup, FieldLabel } from '#components/ui/field'
import { Input } from '#components/ui/input'
import { Textarea } from '#components/ui/textarea'
import { UploadCloud } from 'lucide-react'

export default function CreatePostForm() {
    return (
    <Card className="w-[50%] self-center">
        <CardContent>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="title">Post Title</FieldLabel>
                    <Input id="title" placeholder="Enter a post title"/>
                </Field>
                <Field>
                    <FieldLabel htmlFor="details">
                        Post details
                    </FieldLabel>
                    <Textarea id="details" placeholder="Write your post details here"/>
                </Field>
                <Field>
                    <FieldLabel 
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
                        type="photos"
                        multiple
                        className="hidden"
                    />
                </Field>
                <Field>
                    <Button>Post</Button>
                </Field>
            </FieldGroup>
        </CardContent>
    </Card>
    )
};
