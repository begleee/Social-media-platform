import { Button } from "#components/ui/button";
import { Heart, MessageCircle } from "lucide-react";

export default function PostActions({ likesCount, commentsCount }) {
    return (
        <div className="flex gap-2">
            <Button variant="outline">
                <Heart/>
                {likesCount}
            </Button>
            <Button variant="outline">
                <MessageCircle/>
                {commentsCount}
            </Button>
        </div>
    )
};
