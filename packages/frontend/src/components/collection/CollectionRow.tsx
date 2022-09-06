import classNames from '@/utils/classNames';
import { textDot } from '@/utils/tailwind';
import { lastUpdateBefore } from '@/utils/time';
import { Link } from 'react-router-dom';
import Icon from '../base/Icon';

interface CollectionRowProps {
  className?: string;
  id: string;
  name: string;
  description?: string;
  updatedAt: string;
  isSelected: boolean;
}

function Col({ children, className }: any) {
  return (
    <div className={classNames([className || ''])}>{children}</div>
  );
}

export function HeaderRow({ className }: { className: string }) {
  return (
    <div className={className || ''}>
      <Col className="flex-auto basis-[35%]">
        <p className={textDot}>Name</p>
      </Col>
      <Col className="flex-auto max-w-[45%] basis-[45%]">
        <p className={textDot}>Description</p>
      </Col>
      <Col className="basis-[15%] max-w-[15%]">
        <p className={textDot}>Last updated</p>
      </Col>
    </div>
  );
}

function CollectionRow({
  className,
  name,
  description,
  updatedAt,
  isSelected,
  id,
}: CollectionRowProps) {
  return (
    <div className={className || ''}>
      <Col className="flex items-center flex-auto basis-[35%]">
        <p className={textDot}>{name}</p>
        {isSelected && (
          <Link to={`/collections/${id}`}>
            <Icon type="open" className="w-6 h-6" />
          </Link>
        )}
      </Col>
      <Col className="flex-auto max-w-[45%] basis-[45%]">
        <p className={textDot}>{description || ''}</p>
      </Col>
      <Col className="basis-[15%] max-w-[15%]">
        <p className={textDot}>{lastUpdateBefore(updatedAt)}</p>
      </Col>
    </div>
  );
}
export default CollectionRow;
