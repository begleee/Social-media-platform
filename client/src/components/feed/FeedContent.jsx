import { ScrollArea } from "#components/ui/scroll-area";
import { Button } from "#components/ui/button";
import { Spinner } from "#components/ui/spinner";
import { useFeed } from "../../hooks/useFeed";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#components/ui/card";
import { Badge } from "#components/ui/badge";
import { Skeleton } from "#components/ui/skeleton";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "#components/ui/carousel";

function CardSkeleton() {
  return (
    <Card className="relative mx-auto max-w-2xl pt-0">
        <div className="relative aspect-video w-full overflow-hidden">
          <Skeleton className="h-full w-full rounded-none" />
          <div className="absolute inset-0 z-30 bg-black/35" />
        </div>

        <CardHeader>
          <CardAction>
            <Skeleton className="h-5 w-24" />
          </CardAction>

          <CardTitle className="pt-2">
            <Skeleton className="h-7 w-3/4" />
          </CardTitle>

          <CardDescription className="space-y-2 pt-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </CardDescription>
        </CardHeader>
      </Card>
  )
}


export default function FeedContent() {
  const { data, isLoading, isError } = useFeed();

  if(isLoading) return (
    <ScrollArea className="h-[50%] w-lg mt-20 z-10">
      <CardSkeleton/>
    </ScrollArea>
  );

  if(isError) return <p>Failed loading posts.</p>;

  return (
  <ScrollArea className="h-[50%] w-lg mt-20 z-10">
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
            <Badge>{post.updatedAt.split('T')[0]}</Badge>
          </CardAction>
          <CardTitle>{post.title}</CardTitle>
          {post.details && <CardDescription>{post.details}</CardDescription>}
        </CardHeader>

      </Card>
    ))}
  </ScrollArea>

  )
};
