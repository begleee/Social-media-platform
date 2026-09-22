import { ScrollArea } from "#components/ui/scroll-area";
import { useFeed } from "../../hooks/useFeed";

import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "#components/ui/carousel";

import { Badge } from "#components/ui/badge";
import { CardSkeleton } from "../skeleton/CardSkeleton";


export default function FeedContent() {
  const { data, isLoading, isError } = useFeed();

  if(isLoading) return (
    <ScrollArea className="h-[50%] w-lg mt-20 z-10">
      <CardSkeleton/>
    </ScrollArea>
  );

  if(isError) return <p>Failed loading feed.</p>;

  return (
  <ScrollArea className="h-[50%] w-lg mt-20 z-10">
    {(data.feed.length <= 0) && <p className="text-center">Follow somebody to see the posts.</p>}
    
    {data?.feed?.map((post) => (
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
    ))}
  </ScrollArea>

  )
};
