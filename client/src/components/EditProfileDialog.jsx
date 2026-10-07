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
import { Button } from "#components/ui/button";
import { toast } from "#components/ui/toast";
import { useUpdateProfile } from "../hooks/useUsers";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import UploadAvatarInput from "./UploadAvatarInput";

export default function EditProfileDialog({ children }) {
    const user = useAuthStore(state => state.user);
    const updateName = useAuthStore(state => state.updateName);
    const { mutate: changeNameMutate, isPending } = useUpdateProfile(user.id);
    const { register, handleSubmit, reset } = useForm();
    const [ isOpen, setIsOpen ] = useState(false);
    const [ inputValue, setInputValue ] = useState(user.name);

    const handleNameChange = (e) => {
        setInputValue(e.target.value);
    }

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
                            <UploadAvatarInput/>
                            <Field>
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <Input {...register("name")} onChange={handleNameChange} defaultValue={user.name} id="name"/>
                            </Field>
                        </div>
                        <DialogFooter>
                            <DialogClose render={<Button className="w-fit" variant="outline">Close</Button>}/>
                            <Field className="w-fit">
                                <Button disabled={isPending || inputValue === user.name} type="submit" form="dialog-form">Save changes</Button>
                            </Field>
                        </DialogFooter>
                    </FieldGroup>
            </DialogContent>
        </Dialog>
    )
};
