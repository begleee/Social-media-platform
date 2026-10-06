import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTrigger, 
    DialogTitle, 
    DialogDescription, 
    DialogFooter, 
    DialogClose 
} from "#components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "#components/ui/field";
import { Input } from "#components/ui/input";
import { Avatar, AvatarImage } from "#components/ui/avatar";
import { Button } from "#components/ui/button";
import { toast } from "#components/ui/toast";
import { CameraIcon } from "lucide-react";
import { useUpdateProfile } from "../hooks/useUsers";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";

export default function EditProfileDialog({ children }) {
    const user = useAuthStore(state => state.user);
    const updateName = useAuthStore(state => state.updateName);
    const { mutate: changeNameMutate, isPending } = useUpdateProfile(user.id);
    const { register, handleSubmit, reset } = useForm();
    const [ isOpen, setIsOpen ] = useState(false);
    const prevName = user.name;

    const onSubmit = handleSubmit(async (data) => {
        changeNameMutate({ name: data.name }, {
            onSuccess: () => {
                reset();
                setIsOpen(false);
                updateName(data.name);
                toast.add({ description: "Profile successfully updated."});
            },
            onError: (error) => {
                toast.add({ description: `Failed to change name. ${error.message}` });
            }
        });
    });

    return (
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
            <DialogTrigger className="w-full" render={children}/>
            <DialogContent>
                <form id="dialog-form" onSubmit={onSubmit} className="hidden"/>
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>Change your profile information</DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <div className="flex gap-4">
                            <Field className="w-fit">
                                <FieldLabel className="relative rounded-full" onClick={() => {}} htmlFor="image">
                                    <Avatar className="w-20 h-20">
                                        <AvatarImage className="w-20 h-20" src={user.avatarUrl}/>
                                    </Avatar>
                                    <div className="absolute inset-0 bg-black/60 rounded-full">
                                        <CameraIcon size={40} nonScalingStroke={true} className="absolute top-5 left-5"/>
                                    </div>
                                </FieldLabel>
                                <input
                                    type="file"
                                    className="hidden"
                                    id="image"
                                    onChange={() => {}}
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <Input {...register("name")} id="name" defaultValue={prevName}/>
                            </Field>
                        </div>
                        <DialogFooter>
                            <DialogClose render={<Button className="w-fit" variant="outline">Close</Button>}/>
                            <Field className="w-fit">
                                <Button disabled={isPending} type="submit" form="dialog-form">Save changes</Button>
                            </Field>
                        </DialogFooter>
                    </FieldGroup>
            </DialogContent>
        </Dialog>
    )
};
