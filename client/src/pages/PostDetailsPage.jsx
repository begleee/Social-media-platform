import { useParams } from "react-router"
import { useGetPost } from "../hooks/usePosts";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "#components/ui/carousel";
import { Badge } from "#components/ui/badge";
import { Skeleton } from "#components/ui/skeleton";

export default function PostDetailsPage() {
    const { postId } = useParams();
    const { data, isLoading, isError } = useGetPost(postId);
    const post = data.post;
    
    return (
        <Card className="relative mx-auto max-w-2xl pt-0 overflow-hidden" key={post.id}>
            <div className="relative aspect-video w-full">
            <div className="absolute inset-0 z-20 bg-black/35 pointer-events-none" />

                {post.imageUrls && post.imageUrls.length > 0 && (
                <Carousel className="w-full h-full">
                    <CarouselContent className="ml-0 h-full">
                    {post.imageUrls.map((image) => (
                        <CarouselItem key={image.id} className="pl-0 h-full">
                        <img 
                            src={image.url} 
                            alt="" 
                            className="w-full h-full object-cover"
                        />
                        </CarouselItem>
                    ))}
                    </CarouselContent>
                    
                    {post.imageUrls.length > 1 && (
                    <>
                        <CarouselPrevious className="absolute left-4 top-1/2 z-30" />
                        <CarouselNext className="absolute right-4 top-1/2 z-30" />
                    </>
                    )}
                </Carousel>
                )}
            </div>

            <CardHeader className="relative z-10">
                <CardAction>
                <Badge variant="ghost">{post.updatedAt.split('T')[0]}</Badge>
                </CardAction>
                <CardTitle>{post.title}</CardTitle>
                {post.details && <CardDescription>{post.details}</CardDescription>}
            </CardHeader>

        </Card>
    )
};
