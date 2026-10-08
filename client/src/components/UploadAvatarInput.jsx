import { Field, FieldLabel } from "#components/ui/field";
import { Avatar, AvatarImage } from "#components/ui/avatar";
import { CameraIcon } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useDeleteAvatar, useUploadAvatar } from "../hooks/useUsers";
import { toast } from "#components/ui/toast";
import { Spinner } from "#components/ui/spinner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "#components/ui/dropdown-menu";
import { useRef } from "react";

export default function UploadAvatarInput() {
    const user = useAuthStore(state => state.user);
    const updateAvatarUrl = useAuthStore(state => state.updateAvatarUrl);
    const { mutate: uploadAvatarMutate, isPending } = useUploadAvatar(user.id);
    const { mutate: deleteAvatarMutate, isPending: isDeletingPending } = useDeleteAvatar(user.id);

    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if(!file) return;

        const formData = new FormData();
        formData.append("image", e.target.files[0]);

        uploadAvatarMutate(formData, {
            onSuccess: (data) => {
                toast.add({ description: "Avatar successfully updated." });
                updateAvatarUrl(data.newUrl);
            },
            onError: (error) => {
                toast.add({ description: `Failed to change avatar. ${error.message}` });
            }
        });
    };

    const handleDeleteAvatar = () => {
        deleteAvatarMutate(undefined, {
            onSuccess: () => {
                toast.add({ description: "Avatar successfully delted" });
                updateAvatarUrl(null);
            },
            onError: (error) => {
                toast.add({ description: `Failed to delte avatar. ${error.message}` });
            }
        });
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    }

    return (
        <Field className="w-fit">
                {user.avatarUrl 
                    ? <DropdownMenu>
                        <DropdownMenuTrigger className="relative rounded-full cursor-pointer">
                            <Avatar className="w-20 h-20">
                            <AvatarImage className="w-20 h-20" src={user.avatarUrl}/>
                        </Avatar>
                        <div className={`absolute inset-0 ${isPending ? "bg-black" : "bg-black/60"} rounded-full`}>
                            {isPending 
                                ? <Spinner className="absolute top-5 left-5 w-10 h-10"/> 
                                : <CameraIcon size={40} nonScalingStroke={true} className="absolute top-5 left-5"/>
                            }
                        </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>Choose action</DropdownMenuLabel>
                                <DropdownMenuItem onClick={triggerFileInput}>Change avatar</DropdownMenuItem>
                                <DropdownMenuItem variant="destructive" onClick={handleDeleteAvatar} disabled={isDeletingPending}>Delete avatar</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                : <>
                    <FieldLabel className="relative rounded-full cursor-pointer" htmlFor="image">
                        <Avatar className="w-20 h-20">
                            <AvatarImage className="w-20 h-20" src={user.avatarUrl}/>
                        </Avatar>
                        <div className={`absolute inset-0 ${isPending ? "bg-black" : "bg-black/60"} rounded-full`}>
                            {isPending 
                                ? <Spinner className="absolute top-5 left-5 w-10 h-10"/> 
                                : <CameraIcon size={40} nonScalingStroke={true} className="absolute top-5 left-5"/>
                            }
                        </div>
                    </FieldLabel>
                </>}
            <input
                ref={fileInputRef}
                disabled={isPending}
                type="file"
                accept="image/*"
                className="hidden"
                id="image"
                onChange={handleFileChange}
            />
        </Field>
    )
}