import classNames from '@/utils/classNames';
import { textDot } from '@/utils/tailwind';
import { lastUpdateBefore } from '@/utils/time';
import { Link } from 'react-router-dom';
import Card from '../base/Card';
import Icon from '../base/Icon';

interface CollectionCardProps {
  className?: string;
  id: string;
  name: string;
  description?: string;
  updatedAt: string;
  isSelected: boolean;
}

export function SkeletonCard() {
  return (
    <Card className="flex flex-col rounded-lg p-4 gap-1 border">
      <h3 className="opacity-40 w-full h-6 index-skeleton-animation"></h3>
      <p className="opacity-20 w-1/2 h-4 index-skeleton-animation"></p>
      <p className="opacity-20 w-1/2 h-4 index-skeleton-animation"></p>
    </Card>
  );
}

function CollectionCard({
  className,
  id,
  name,
  description,
  updatedAt,
  isSelected,
}: CollectionCardProps) {
  return (
    <Card className={classNames([className || ''])}>
      <div className="flex items-center justify-between">
        <h3 className={classNames([textDot, 'font-bold'])}>{name}</h3>
        {isSelected && (
          <Link to={`/collections/${id}`}>
            <Icon type="open" className="w-6 h-6" />
          </Link>
        )}
      </div>
      <p className={classNames([textDot, 'text-xs'])}>
        {description || ''}
      </p>
      <p className={classNames([textDot, 'text-xs text-slate-400'])}>
        {lastUpdateBefore(updatedAt)}
      </p>
    </Card>
  );
}
export default CollectionCard;
