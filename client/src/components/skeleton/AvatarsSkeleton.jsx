import { Skeleton } from "#components/ui/skeleton";

export function AvatarsSkeleton() {
    return (
        <div className="flex flex-wrap gap-2 items-center grayscale fixed">
            <Skeleton className="h-10 w-10 rounded-full"/>
            <Skeleton className="h-10 w-10 rounded-full"/>
            <Skeleton className="h-10 w-10 rounded-full"/>
            <Skeleton className="h-10 w-10 rounded-full"/>
            <Skeleton className="h-10 w-10 rounded-full"/>
        </div>
    )
}