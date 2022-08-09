import classNames from '@/utils/classNames';
import Card from '../base/Card';

interface CollectionCardProps {
  className?: string;
  name: string;
  description?: string;
  isPublic: boolean;
  ownerId: string;
  updatedAt: number;
}

function CollectionCard({
  className,
  name,
  description,
  updatedAt,
}: CollectionCardProps) {
  return (
    <Card className={classNames([className || ''])}>
      <h3>{name}</h3>
      <p>{description || ''}</p>
      <p>{updatedAt}</p>
    </Card>
  );
}
export default CollectionCard;
