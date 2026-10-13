import { Badge } from "#components/ui/badge";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "#components/ui/carousel";
import { ImageOff } from "lucide-react";
import PostCardActions from "./PostCardActions";
import PostCardHeader from "./PostCardHeader";

export default function PostCard({ post, isFollowed }) {
  return (
    <div className="flex flex-col w-full max-w-md mx-auto gap-2">
      <PostCardHeader 
        userId={post.authorId.id} 
        isFollowed={isFollowed} 
        name={post.authorId.name} 
        avatarUrl={post.authorId.avatarUrl}
        post={post}
      />
      
      <Card className="relative w-full mx-auto pt-0 overflow-hidden rounded-xl border shadow-sm" key={post.id}>        
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <div className="absolute inset-0 z-20 bg-black/25 pointer-events-none" />

          {post.imageUrls && post.imageUrls.length > 0 ? (
            <Carousel className="w-full h-full">
              <CarouselContent className="ml-0 h-full">
                {post.imageUrls.map((image) => (
                  <CarouselItem key={image.id} className="pl-0 h-full">
                    {image.url && (
                      <img 
                        src={image.url}
                        alt={post.title || "Post image"} 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {post.imageUrls.length > 1 && (
                <>
                  <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-30 h-8 w-8 bg-background/80 backdrop-blur-sm" />
                  <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-30 h-8 w-8 bg-background/80 backdrop-blur-sm" />
                </>
              )}
            </Carousel>
          ) : (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-muted/60 text-muted-foreground p-4 text-center">
              <ImageOff className="mb-2 h-5 w-5 opacity-60" />
              <span className="text-xs font-medium">No Image Available</span>
            </div>
          )}
        </div>

        <CardHeader className="relative z-10 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1 pr-1">
                <CardTitle className="text-base sm:text-lg font-semibold leading-snug line-clamp-2">
                {post.title}
                </CardTitle>
              
                {post.details && (
                <CardDescription className="text-xs sm:text-sm text-muted-foreground line-clamp-3">
                    {post.details}
                </CardDescription>
                )}

                <div className="pt-1">
                    <PostCardActions
                        isLiked={post.likes?.length > 0}
                        postId={post.id}
                        likesCount={post["_count"]?.likes ?? 0}
                        commentsCount={post["_count"]?.comments ?? 0}
                    />
                </div>
            </div>

            <CardAction className="shrink-0 pt-0.5">
              <Badge variant="ghost" className="text-[11px] font-normal px-2 py-0.5 whitespace-nowrap">
                {post.updatedAt?.split('T')[0]}
              </Badge>
            </CardAction>
          </div>

        </CardHeader>
      </Card>
    </div>
  );
};
