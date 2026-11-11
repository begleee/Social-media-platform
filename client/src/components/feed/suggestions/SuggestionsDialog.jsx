import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "#components/ui/dialog";
import { Item, ItemActions, ItemContent, ItemMedia } from "#components/ui/item";
import { ScrollArea } from "#components/ui/scroll-area";
import { useGetSuggestions } from "../../../hooks/useSuggestions";
import FollowButton from "../../FollowButton";
import SuggestionsAvatar from "./SuggestionsAvatar";

export default function SuggestionsDialog({ children }) {
    const { data } = useGetSuggestions();
    const { suggestedUsers } = data;

    return (
        <Dialog defaultOpen={false}>
            <DialogTrigger render={children}/>
            <DialogContent>
                <DialogHeader>Suggestions</DialogHeader>
                <ScrollArea className="flex w-full h-96 z-10 px-2 sm:px-4">
                    {suggestedUsers && suggestedUsers.map((user) => (
                        <Item key={user?.id} variant="outline" className="my-2">
                            <ItemMedia>
                                <SuggestionsAvatar avatarUrl={user?.avatarUrl} name={user?.name} type="dialog"/>
                            </ItemMedia>
                            <ItemContent>
                                {user?.name}
                            </ItemContent>
                            <ItemActions>
                                <FollowButton userId={user.id} isFollowed={false}/>
                            </ItemActions>
                        </Item>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
