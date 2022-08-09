import classNames from '@/utils/classNames';
import { flexXYCenter } from '@/utils/tailwind';
import Card from '../base/Card';
import Icon from '../base/Icon';

function CreateCollectionCard({
  openCreateModal,
}: {
  openCreateModal: () => void;
}) {
  return (
    <Card
      className="p-4 transition hover:bg-slate-50 select-none"
      onClick={openCreateModal}
    >
      <div className={classNames([flexXYCenter, 'gap-2'])}>
        <div className="flex flex-col">
          <h4 className="text-base font-bold">New collection</h4>
          <h5 className="text-xs text-slate-400">
            Manage items and people
          </h5>
        </div>
        <Icon type="plus" />
      </div>
    </Card>
  );
}
export default CreateCollectionCard;
