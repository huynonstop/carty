import { useAuthContext } from '@/features/auth/auth.context';
import { toggleItemRequest } from '@/features/item/item.api';
import { useItemsContext } from '@/features/item/items.context';
import { WithClassName } from '@/utils/hoc/WithClassName';
import ItemCard from './ItemCard';
import { ItemsEmpty } from './ItemsSkeleton';

interface ItemsViewProps {
  className?: string;
  toggleItem: (toggleData: {
    checked: boolean;
    itemId: string;
  }) => Promise<void>;
  isUser: boolean;
}

function ItemsView({
  className = '',
  toggleItem,
  isUser,
}: ItemsViewProps) {
  const { items, setModalItem } = useItemsContext();
  if (items.length === 0) {
    return <ItemsEmpty />;
  }
  return (
    <WithClassName
      className={[
        className,
        'grid grid-cols-1 auto-rows-[1fr] gap-4',
      ]}
    >
      {items.map((item) => {
        return (
          <ItemCard
            isUser={isUser}
            toggleItem={toggleItem}
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
