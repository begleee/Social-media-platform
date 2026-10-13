import { Card, CardHeader } from "#components/ui/card";
import { Skeleton } from "#components/ui/skeleton";

export default function PostCardSkeleton() {
  return (
    <div className="flex flex-col w-full max-w-md mx-auto gap-2">
      <div className="flex justify-between items-center w-full px-1">
        <div className="flex gap-2 items-center">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-4 w-28" />
        </div>
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>

      <Card className="relative w-full mx-auto pt-0 overflow-hidden rounded-xl border shadow-sm">
        <div className="relative aspect-video w-full">
          <Skeleton className="h-full w-full rounded-none" />
        </div>

        <CardHeader className="relative z-10 p-4 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-2 w-full pr-1">
              <Skeleton className="h-5 w-3/4" />

              <div className="space-y-1.5 pt-1">
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-4/5" />
              </div>
            </div>

            <Skeleton className="h-5 w-16 rounded-full shrink-0" />
          </div>

          <div className="flex items-center gap-4 pt-1">
            <Skeleton className="h-8 w-14 rounded-md" />
            <Skeleton className="h-8 w-14 rounded-md" />
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}