import { Button } from '@base-ui/react/button';
import { useUsers } from '../../hooks/useUsers';
import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage
} from "#components/ui/avatar";
import { Spinner } from '#components/ui/spinner';
import { PlusIcon } from 'lucide-react';

export default function FeedHead() {
    const { data, isLoading, isError } = useUsers();
    
    if(isLoading) return (
        <Button disabled className="flex gap-2 items-center">
            <p>Loading</p>
            <Spinner data-icon="inline-start" />
        </Button>
    );

    if(isError) return <p>Failed loading users.</p>;

    return (
            <div className="flex flex-wrap items-center gap-2 grayscale fixed">
                {data.users.map(user => (
                    <Avatar size="lg" key={user.id}>
                        <AvatarImage  alt={`${user.name} avatar`} />
                        <AvatarFallback>{user.name}</AvatarFallback>
                    </Avatar>
                ))}
                <AvatarGroupCount>
                    <PlusIcon/>
                </AvatarGroupCount>
            </div>
    )
};
