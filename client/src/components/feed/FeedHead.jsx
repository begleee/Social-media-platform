import { useUsers } from '../../hooks/useUsers';

import {
    Avatar,
    AvatarFallback,
    AvatarGroupCount,
    AvatarImage
} from "#components/ui/avatar";

import { PlusIcon } from 'lucide-react';
import { AvatarsSkeleton } from '../skeleton/AvatarsSkeleton';

export default function FeedHead() {
    const { data, isLoading, isError } = useUsers();
    
    if(isLoading) return (
        <AvatarsSkeleton/>
    );

    if(isError) return <p>Failed loading users.</p>;

    return (
        <div className="flex flex-wrap items-center gap-2 grayscale fixed">
            {data.users.map(user => (
                <Avatar size="lg" key={user.id}>
                    <AvatarImage src={user.avatarUrl} alt={`${user.name} avatar`} />
                    <AvatarFallback>{user.name}</AvatarFallback>
                </Avatar>
            ))}
            <AvatarGroupCount>
                <PlusIcon/>
            </AvatarGroupCount>
        </div>
    )
};
