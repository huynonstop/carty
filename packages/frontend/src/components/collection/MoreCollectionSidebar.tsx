import { useAuthContext } from '@/features/auth/auth.context';
import { getPublicCollectionsByUserRequest } from '@/features/collection/collection.api';
import classNames from '@/utils/classNames';
import { useFetch } from '@/utils/hooks/useFetch';
import { useEffect } from 'react';
import Button from '../base/Button';
import CollectionCard from './CollectionCard';

interface MoreCollectionSidebarProps {
  isOwner: boolean;
  className?: string;
  ownerId: string;
  deleteCollection?: () => Promise<void>;
}

function MoreCollectionSidebar({
  className = '',
  isOwner,
  ownerId,
  deleteCollection,
}: MoreCollectionSidebarProps) {
  const { authState } = useAuthContext();
  const [collections, wrapper] = useFetch([]);
  useEffect(() => {
    wrapper(
      getPublicCollectionsByUserRequest,
      {
        userId: ownerId,
        accessToken: authState.accessToken,
        take: 5,
      },
      (data: any) => data.collections,
    );
  }, []);
  return (
    <aside className={className}>
      {isOwner && (
        <Button
          onClick={deleteCollection}
          className={classNames([
            'whitespace-nowrap text-sm  rounded p-2',
            'border border-red-500 bg-red-500 text-white',
          ])}
        >
          Delete this collection
        </Button>
      )}
      {collections.length !== 0 && (
        <div className="flex flex-col gap-1 text-sm">
          <div className="whitespace-nowrap">
            <strong>More from this user</strong>
          </div>
          <div className="grid grid-cols-1 auto-rows-[1fr] gap-2">
            {collections.map((collection: any) => {
              return (
                <CollectionCard
                  className="p-2 hover:bg-slate-100"
                  key={collection.id}
                  isSelected={true}
                  {...collection}
                />
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
}
export default MoreCollectionSidebar;
