import classNames from '@/utils/classNames';
import { WithClassName } from '@/utils/hoc/WithClassName';
import { flexXYCenter } from '@/utils/tailwind';
import { useNavigate } from 'react-router-dom';
import Card from '../base/Card';
import Icon from '../base/Icon';

function CloneCollectionCard({
  className = '',
}: {
  className?: string;
}) {
  const navigate = useNavigate();

  return (
    <WithClassName
      as={Card}
      className={[
        className,
        'p-4 transition hover:bg-slate-50 select-none',
        'max-w-[20rem]',
      ]}
      onClick={() => {
        navigate('/community');
      }}
    >
      <div
        className={classNames([
          'flex items-center justify-between',
          'gap-2 h-full',
        ])}
      >
        <div className="flex flex-col">
          <h4 className="text-base font-bold">Clone collection</h4>
          <h5 className="text-xs text-slate-400">
            Use a collection from community
          </h5>
        </div>
        <Icon type="copy" imgClassName="h-4 w-4" />
      </div>
    </WithClassName>
  );
}
export default CloneCollectionCard;
