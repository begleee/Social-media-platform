import { useParams } from "react-router"
import { useGetPost } from "../hooks/usePosts";
import Post from "../components/post_details/Post";
import Head from "../components/Head";
import { Separator } from "#components/ui/separator";
import PostSkeleton from "../components/post_details/PostSkeleton";

export default function PostDetailsPage() {
    const { postId } = useParams();
    const { data, isLoading, isError } = useGetPost(postId);

    if(isLoading) {
        return (
            <div className="flex flex-col gap-4 w-screen px-5 h-full">
            <Head title="Post details"/>
            <Separator/>
            <PostSkeleton/>
        </div>
        )
    }

    if(isError) {
        return (
            <p>Something went wrong, please check your network</p>
        )
    }

    const { post } = data;
    console.log(post);

    return (
        <div className="flex flex-col gap-4 w-screen px-5 h-full">
            <Head title="Post details"/>
            <Separator/>
            <Post post={post}/>
        </div>
    ) 
}