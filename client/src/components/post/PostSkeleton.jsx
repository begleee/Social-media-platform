import { Badge } from "#components/ui/badge";
import { Button } from "#components/ui/button";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Skeleton } from "#components/ui/skeleton";
import { Heart, MessageCircle } from "lucide-react";

export default function PostSkeleton() {
    return (
        <Card className="relative mx-auto max-w-xl pt-0 overflow-hidden">
            <div className="relative aspect-video w-full">
                <Skeleton className="absolute inset-0 z-20 bg-black/35 pointer-events-none" />
                <Skeleton className="w-xl h-xl"/>
            </div>

            <CardHeader className="relative z-10">
                <CardAction>
                <Badge variant="ghost"></Badge>
                </CardAction>
                <CardTitle></CardTitle>
                <CardDescription className="flex flex-col gap-2">
                    <p></p>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <Heart/>
                            0
                        </Button>
                        <Button variant="outline">
                            <MessageCircle/>
                            0
                        </Button>
                    </div>
                </CardDescription>
            </CardHeader>
        </Card>
    )
}