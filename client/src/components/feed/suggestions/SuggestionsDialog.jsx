import { Button } from "#components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "#components/ui/dialog";
import { Item, ItemActions, ItemContent, ItemMedia } from "#components/ui/item";
import { useGetSuggestions } from "../../../hooks/useSuggestions";
import SuggestionsAvatar from "./SuggestionsAvatar";

export default function SuggestionsDialog({ children }) {
    const { data } = useGetSuggestions();
    const { suggestedUsers } = data;

    return (
        <Dialog defaultOpen="false">
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>Suggestions</DialogHeader>
                {suggestedUsers && suggestedUsers.map((user) => (
                    <Item key={user?.id} variant="outline">
                        <ItemMedia>
                            <SuggestionsAvatar avatarUrl={user?.avatarUrl} name={user?.name} type="dialog"/>
                        </ItemMedia>
                        <ItemContent>
                            {user?.name}
                        </ItemContent>
                        <ItemActions>
                            <Button variant="outline">
                                Follow
                            </Button>
                        </ItemActions>
                    </Item>
                ))}
            </DialogContent>
        </Dialog>
    );
};
