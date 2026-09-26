import Head from "../components/Head";
import CreatePostForm from "../components/create_post/CreatePostForm";

export default function CreatePostPage() {
  return (
    <div className="flex flex-col gap-4 w-screen px-5 h-full">
      <Head/>
      <CreatePostForm/>
    </div>
  )
};
