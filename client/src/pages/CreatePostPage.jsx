import { Separator } from "#components/ui/separator";
import CreatePostHead from "../components/createpost/CreatePostHead";
import CreatePostForm from "../components/createpost/CreatePostForm";

export default function CreatePostPage() {
  return (
    <div className="flex flex-col gap-4 w-screen px-5 h-full">
      <CreatePostHead/>
      <Separator/>
      <CreatePostForm/>
    </div>
  )
};
