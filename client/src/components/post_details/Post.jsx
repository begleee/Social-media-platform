import { Badge } from "#components/ui/badge";
import { Button } from "#components/ui/button";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "#components/ui/carousel";
import { Heart, ImageOff, MessageCircle } from "lucide-react";

export default function Post({ post }) {
    return (
        <Card className="relative mx-auto max-w-xl pt-0 overflow-hidden">
            <div className="relative aspect-video w-full">
            <div className="absolute inset-0 z-20 bg-black/35 pointer-events-none" />

                {post.imageUrls && post.imageUrls.length > 0 && (
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
                )}
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