import { Avatar, AvatarFallback, AvatarImage } from "#components/ui/avatar";

export default function SuggestionsAvatar({ avatarUrl, name, children, ...props }) {
    return (
        <Avatar className="transition-transform hover:scale-105" {...props}>
            {children || (
                <>
                    <AvatarImage src={avatarUrl}/>
                    <AvatarFallback>{name && (name.slice(0, 2)).toUpperCase()}</AvatarFallback>
                </>
            )}
        </Avatar>
    )
};
