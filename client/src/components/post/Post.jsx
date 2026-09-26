import { Badge } from "#components/ui/badge";
import { Button } from "#components/ui/button";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "#components/ui/carousel";
import { Skeleton } from "#components/ui/skeleton";
import { Heart, ImageOff, MessageCircle } from "lucide-react";
import PostSkeleton from "./PostSkeleton";

export default function Post({ data, isLoading, isError }) {

    if(isLoading) {
        return (
            <PostSkeleton/>
        )
    }

    if(isError) {
        return (
            <p>Something went wrong, please check your network</p>
        )
    }

    const { post } = data;

    return (
        <Card className="relative mx-auto max-w-xl pt-0 overflow-hidden">
            <div className="relative aspect-video w-full">
                {post.imageUrls && post.imageUrls.length > 0 ? (
                    <Carousel className="w-full h-full">
                        <CarouselContent className="ml-0 h-full">
                        {post.imageUrls.map((image) => (
                            <CarouselItem key={image.id} className="pl-0 h-full">
                            {image.url ? <img 
                                src={image.url}
                                alt="" 
                                className="w-full h-full object-cover"
                            /> : <div>
                                <ImageOff className="mb-1 h-4 w-4 opacity-50" />
                            </div>}
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
                ) : <>
                    <div className="absolute inset-0 z-20 bg-black/35 pointer-events-none">
                        <div className="flex h-full w-full flex-col items-center justify-center " to={post.id}>
                            <ImageOff className="mb-1 h-4 w-4 opacity-50" />
                            <span>No Image</span>
                        </div>
                    </div>
                    <Skeleton className="w-xl h-xl"/>
                </>}
            </div>

            <CardHeader className="relative z-10">
                <CardAction>
                <Badge variant="ghost">{post.updatedAt.split('T')[0]}</Badge>
                </CardAction>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription className="flex flex-col gap-2">
                    <p>{post.details ? post.details : "no post details"}</p>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <Heart/>
                            {post["_count"].likes}
                        </Button>
                        <Button variant="outline">
                            <MessageCircle/>
                            {post["_count"].comments}
                        </Button>
                    </div>
                </CardDescription>
            </CardHeader>

        </Card>
    )
}