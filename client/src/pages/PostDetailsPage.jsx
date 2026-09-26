import { useParams } from "react-router"
import { useGetPost } from "../hooks/usePosts";
import Post from "../components/post/Post";
import Head from "../components/Head";

export default function PostDetailsPage() {
    const { postId } = useParams();
    const { data, isLoading, isError } = useGetPost(postId);

    return (
        <div className="flex flex-col gap-4 w-screen px-5 h-full">
            <Head/>
            <Post data={data} isLoading={isLoading} isError={isError}/>
        </div>
    ) 
}