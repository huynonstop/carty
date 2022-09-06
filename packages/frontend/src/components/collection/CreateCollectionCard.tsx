import classNames from '@/utils/classNames';
import { WithClassName } from '@/utils/hoc/WithClassName';
import { flexXYCenter } from '@/utils/tailwind';
import Card from '../base/Card';
import Icon from '../base/Icon';

function CreateCollectionCard({
  className = '',
  openCreateModal,
}: {
  className?: string;
  openCreateModal: () => void;
}) {
  return (
    <WithClassName
      as={Card}
      className={[
        className,
        'p-4 transition hover:bg-slate-50 select-none',
        'max-w-[20rem]',
      ]}
      onClick={openCreateModal}
    >
      <div
        className={classNames([
          'flex items-center justify-between',
          'gap-2',
        ])}
      >
        <div className="flex flex-col">
          <h4 className="text-base font-bold">New collection</h4>
          <h5 className="text-xs text-slate-400">
            Manage items and people from scratch
          </h5>
        </div>
        <Icon type="plus" />
      </div>
    </WithClassName>
  );
}
export default CreateCollectionCard;
