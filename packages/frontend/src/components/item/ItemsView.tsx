import { useAuthContext } from '@/features/auth/auth.context';
import { toggleItem } from '@/features/item/item.api';
import { useItemsContext } from '@/features/item/items.context';
import { WithClassName } from '@/utils/hoc/WithClassName';
import ItemCard from './ItemCard';
import { ItemsEmpty } from './ItemsSkeleton';

interface ItemsViewProps {
  className?: string;
  setCollection: (collection: any) => void;
  isUser: boolean;
}

function ItemsView({
  className = '',
  setCollection,
  isUser,
}: ItemsViewProps) {
  const { items, setModalItem, setItems } = useItemsContext();
  const { authState } = useAuthContext();
  if (items.length === 0) {
    return <ItemsEmpty />;
  }
  const onToggle = async ({
    checked,
    itemId,
    collectionId,
  }: {
    checked: boolean;
    itemId: string;
    collectionId: string;
  }) => {
    try {
      const res = await toggleItem({
        itemId,
        collectionId,
        accessToken: authState.accessToken,
        buyerId: checked ? authState.userId : null,
      });
      const data = await res.json();
      if (res.status !== 200) {
        throw data;
      }
      const { collection } = data;
      setCollection(collection);
      setItems(collection.items);
    } catch (err) {
      throw err;
    }
  };
  return (
    <WithClassName className={[className, 'flex flex-col gap-4']}>
      {items.map((item) => {
        return (
          <ItemCard
            isUser={isUser}
            onToggle={onToggle}
            key={item.id}
            item={item}
            onClick={(e) => {
              setModalItem(item);
            }}
          />
        );
      })}
    </WithClassName>
  );
}
export default ItemsView;
