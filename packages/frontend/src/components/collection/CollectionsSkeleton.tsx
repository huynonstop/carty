import classNames from '@/utils/classNames';
import { flexColXYCenter } from '@/utils/tailwind';
import { SkeletonCard } from './CollectionCard';

export function CollectionsLoading() {
  return (
    <div
      className={classNames([
        'grid grid-cols-1 gap-4',
        'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
      ])}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => {
        return <SkeletonCard key={id} />;
      })}
    </div>
  );
}
export function CollectionsEmpty() {
  return (
    <div className={classNames(['w-full', flexColXYCenter])}>
      <h4>No collections yet</h4>
      <h5>
        Create a new collections from scratch. Or, you can use one of
        our templates
      </h5>
    </div>
  );
}
