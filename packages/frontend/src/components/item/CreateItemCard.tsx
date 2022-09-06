import classNames from '@/utils/classNames';
import { flexXYCenter } from '@/utils/tailwind';
import Card from '../base/Card';
import Icon from '../base/Icon';

function CreateItemCard({
  openCreateModal,
}: {
  openCreateModal?: () => void;
}) {
  return (
    <Card
      className="p-2 transition hover:border-primary hover:bg-slate-50 cursor-pointer"
      onClick={openCreateModal}
    >
      <div
        className={classNames([
          flexXYCenter,
          'gap-2 whitespace-nowrap',
        ])}
      >
        <Icon className="h-4 w-4" type="plus" />
        <div className="flex flex-col">
          <h4 className="text-sm font-bold">Create new item</h4>
        </div>
      </div>
    </Card>
  );
}
export default CreateItemCard;
