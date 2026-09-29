import { useLocation, useParams } from "react-router"
import { useGetPost } from "../hooks/usePosts";
import PostCard from "../components/post/PostCard";
import Head from "../components/Head";
import PostSkeleton from "../components/post/PostSkeleton";

export default function PostDetailsPage() {
    const { postId } = useParams();
    const location = useLocation();

    const initialPost = location.state?.post;
    const { data, isLoading, isError } = useGetPost(postId, {
        enabled: !initialPost
    });

    if(!initialPost && isLoading) {
        return (
            <div className="flex flex-col gap-4 w-screen px-5 h-full">
                <Head/>
                <PostSkeleton/>
            </div>
        )
    }

    if(isError) {
        return (
            <div className="flex flex-col gap-4 w-screen px-5 h-full">
                <Head/>
                <p>Something went wrong, please check your network</p>
            </div>
        )
    }

    const post = initialPost || data.post;

    return (
        <div className="flex flex-col gap-4 w-screen px-5 h-full">
            <Head/>
            <PostCard post={post}/>
        </div>
    ) 
};
