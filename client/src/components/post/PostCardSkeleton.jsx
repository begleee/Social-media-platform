import { Card, CardHeader } from "#components/ui/card";
import { Skeleton } from "#components/ui/skeleton";

export default function PostCardSkeleton() {
    return (
    <div className="flex flex-col mx-auto w-full max-w-2xl gap-2">
        
        <div className="flex justify-between items-center w-full">
            <div className="flex gap-2 items-center">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-9 w-20 rounded-md" />
        </div>

        <Card className="relative w-full max-w-2xl pt-0 overflow-hidden border">
            <div className="relative aspect-video w-full">
                <Skeleton className="h-full w-full rounded-none" />
            </div>
            <CardHeader className="relative z-10 space-y-3">
                
                <div>
                    <Skeleton className="h-5 w-16 rounded-md" />
                </div>
                
                <Skeleton className="h-6 w-2/3" />
                
                <div className="space-y-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                </div>

                <div className="flex gap-2 pt-2">
                    <Skeleton className="h-9 w-16 rounded-md" />
                    <Skeleton className="h-9 w-16 rounded-md" />
                </div>

            </CardHeader>
        </Card>
    </div>
    )
}