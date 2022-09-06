import classNames from '@/utils/classNames';
import { flexColXYCenter } from '@/utils/tailwind';

export function ItemsEmpty() {
  return (
    <div className={classNames(['w-full h-[60vh]', flexColXYCenter])}>
      <h4>No items in this collection</h4>
      <h5 className="text-center">
        Feel free to create a new item and put it in your collection
      </h5>
    </div>
  );
}
