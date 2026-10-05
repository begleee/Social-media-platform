import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "#components/ui/dialog";
import { Item, ItemActions, ItemContent, ItemMedia } from "#components/ui/item";
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
                {suggestedUsers && suggestedUsers.map((user) => (
                    <Item key={user?.id} variant="outline">
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
            </DialogContent>
        </Dialog>
    );
};
