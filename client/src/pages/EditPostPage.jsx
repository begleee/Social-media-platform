import { useLocation } from "react-router"
import Head from "../components/Head";
import EditPostForm from "../components/post/EditPostForm";

export default function EditPostPage() {
    const location = useLocation();
    const post = location.state;

    return (
        <div className="flex flex-col gap-4 w-screen px-5 h-full">
            <Head/>
            <EditPostForm post={post}/>
        </div>
    ) 
};
