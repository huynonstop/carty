import { WithClassName } from '@/utils/hoc/WithClassName';
import Card from '../base/Card';
import {
  ChangeEventHandler,
  MouseEventHandler,
  useState,
} from 'react';
import Spinner from '../Spinner';
import { toast } from 'react-toastify';
interface ItemCardProps {
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  item: any;
  toggleItem: (toggleData: {
    checked: boolean;
    itemId: string;
  }) => Promise<void>;
  isUser: boolean;
}
function ItemCard({
  className = '',
  item,
  onClick,
  toggleItem,
  isUser,
}: ItemCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    id,
    name,
    quantity,
    price,
    description,
    buyerId,
    collectionId,
  } = item;
  const canBuy = !!buyerId;
  const toggleItemHandler: ChangeEventHandler<
    HTMLInputElement
  > = async (e) => {
    setIsLoading(true);
    try {
      await toggleItem({
        checked: e.target.checked,
        itemId: id,
      });
    } catch (err) {
      toast.error('Toggle failed');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <WithClassName
      as={Card}
      className={[
        className,
        'flex flex-col p-4 rounded bg-slate-50 border-transparent',
        'hover:bg-slate-100',
        'transition',
      ]}
      onClick={isUser ? onClick : undefined}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-0.5">
          <span>
            <strong>{name}</strong>
          </span>
        </div>
        <div className="flex items-center gap-0.5">
          <div className="flex items-center gap-0.5">
            <span>{quantity}</span>
            <span className="text-xs">x</span>
            <span>{`${price}$`}</span>
          </div>
          {isUser && (
            <div
              className="w-4 h-4 p-1 flex items-center"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              {isLoading ? (
                <Spinner className="p-1 bg-primary" />
              ) : (
                <input
                  type="checkbox"
                  checked={canBuy}
                  onChange={toggleItemHandler}
                />
              )}
            </div>
          )}
        </div>
      </div>
      <div>
        {description && <p className="break-all">{description}</p>}
      </div>
    </WithClassName>
  );
}
export default ItemCard;
