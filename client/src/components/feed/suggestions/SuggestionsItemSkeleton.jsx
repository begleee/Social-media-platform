import { Skeleton } from "#components/ui/skeleton";

export default function SuggestionsItemSkeleton() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
        <div className="flex items-center justify-between gap-4 p-4 border rounded-lg">

        <div className="flex -space-x-2">
            <Skeleton className="h-10 w-10 rounded-full ring-2 ring-background hidden sm:flex" />
            <Skeleton className="h-10 w-10 rounded-full ring-2 ring-background hidden sm:flex" />
            <Skeleton className="h-10 w-10 rounded-full ring-2 ring-background hidden sm:flex" />
        </div>

        <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-48" />
        </div>

        <div>
            <Skeleton className="h-10 w-28 rounded-md" />
        </div>

        </div>
    </div>
    )
}