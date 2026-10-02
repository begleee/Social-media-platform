import { useGetSuggestions } from "../../hooks/useSuggestions"

export default function Suggestions() {
    const { data, isPending } = useGetSuggestions();

    data && console.log(data);
    return (
        <div>Suggestions</div>
    )
}
