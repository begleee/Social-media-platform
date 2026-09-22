import { useGetMyPosts } from "../../hooks/usePosts";
import { Skeleton } from "#components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "#components/ui/alert";
import { AspectRatio } from "#components/ui/aspect-ratio";
import { AlertCircle, ImageOff } from "lucide-react";

export default function UserPosts() {
  const { data, isLoading, isError } = useGetMyPosts();

    if (isLoading) {
        return (
            <div className="w-full max-w-6xl mx-auto p-6">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-full overflow-hidden rounded-xl border bg-card">
                        <AspectRatio ratio={1 / 1} className="w-full">
                        <Skeleton className="w-52" />
                        </AspectRatio>
                    </div>
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="mx-auto my-12 max-w-md p-4">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                    Failed to load user posts. Please try refreshing the page.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    const posts = data?.posts || [];

    if (posts.length === 0) {
        return (
            <div className="flex min-h-75 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <ImageOff className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">No posts found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    When you share your first post, it will show up here.
                </p>
            </div>
        );
    }

    return (
        <div className="p-6 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {posts.map((post) => {
                    const firstImageUrl = post.imageUrls?.[0]?.url;

                    return (
                        <div
                            key={post.id || firstImageUrl}
                            className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-200 hover:shadow-md hover:border-muted-foreground/30"
                        >
                            <AspectRatio ratio={1 / 1}>
                            {firstImageUrl ? (
                                <img
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                src={firstImageUrl}
                                alt={post.title || "User post"}
                                loading="lazy"
                                />
                            ) : (
                                <div className="flex h-full w-full flex-col items-center justify-center bg-muted/40 p-2 text-center text-xs text-muted-foreground">
                                <ImageOff className="mb-1 h-4 w-4 opacity-50" />
                                <span>No Image</span>
                                </div>
                            )}
                            </AspectRatio>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
