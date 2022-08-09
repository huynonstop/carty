import classNames from '@/utils/classNames';

interface CollectionCardProps {
  className?: string;
  name: string;
  description?: string;
  isPublic: boolean;
  ownerId: string;
  updatedAt: number;
}

function CollectionRow({
  className,
  name,
  description,
  updatedAt,
}: CollectionCardProps) {
  return (
    <div
      className={classNames([className || '', 'flex items-center'])}
    >
      <h3>{name}</h3>
      <p>{description || ''}</p>
      <p>{updatedAt}</p>
    </div>
  );
}
export default CollectionRow;
