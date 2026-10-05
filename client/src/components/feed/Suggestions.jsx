import { useGetSuggestions } from "../../hooks/useSuggestions"
import SuggestionsAvatar from "./suggestions/SuggestionsAvatar";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "#components/ui/item";
import { Button } from "#components/ui/button";
import SuggestionsDialog from "./suggestions/SuggestionsDialog";
import SuggestionsItemSkeleton from "./suggestions/SuggestionsItemSkeleton";

export default function Suggestions() {
    const { data, isPending } = useGetSuggestions();

    if(isPending) return (
        <SuggestionsItemSkeleton/>
    )

    const { suggestedUsers } = data && data;

    return (
        <div className="flex w-full max-w-lg flex-col gap-6">
        <Item variant="outline">
            <ItemMedia>
                <div className="flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale">
                    {!isPending && suggestedUsers && suggestedUsers.slice(0, 3).map((user) => (
                        <SuggestionsAvatar
                            className="hidden sm:flex" 
                            key={user.id} 
                            avatarUrl={user.avatarUrl} 
                            name={user.name}
                        />
                    ))}
                </div>
            </ItemMedia>
            <ItemContent>
                <ItemTitle>Suggested users</ItemTitle>
                <ItemDescription>See the list of suggested users</ItemDescription>
            </ItemContent>
            <ItemActions>
                <SuggestionsDialog>
                    <Button>
                        Open the list
                    </Button>
                </SuggestionsDialog>
            </ItemActions>
        </Item>
        </div>
    );
};
