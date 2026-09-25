import { Separator } from "#components/ui/separator";
import CreatePostHead from "../components/Head";
import CreatePostForm from "../components/create_post/CreatePostForm";

export default function CreatePostPage() {
  return (
    <div className="flex flex-col gap-4 w-screen px-5 h-full">
      <CreatePostHead title="Create post"/>
      <Separator/>
      <CreatePostForm/>
    </div>
  )
};
