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
      {data?.feed?.map(post => (
        <Card className="relative mx-auto max-w-2xl pt-0" key={post.id}>
          <div className="absolute inset-0 z-30 aspect-video bg-black/35"/>
          {<img
            src="https://avatar.vercel.sh/shadcn1"
            alt="Event cover"
            className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
          />}
          <CardHeader>
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
