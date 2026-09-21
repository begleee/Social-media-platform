import { Button } from "#components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router'

export default function CreatePostHead() {
    const navigate = useNavigate();
    return (
        <div className="flex items-center gap-4">
            <Button onClick={() => navigate(-1)} variant="outline">
                <ArrowLeft/>
            </Button>
            <p>Create Post</p>
        </div>
    )
};
