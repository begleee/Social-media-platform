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
import { Skeleton } from '#components/ui/skeleton';
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
