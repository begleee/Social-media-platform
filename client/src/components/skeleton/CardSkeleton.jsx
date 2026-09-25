import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#components/ui/card";

import { Skeleton } from "#components/ui/skeleton";

export function CardSkeleton() {
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
};
