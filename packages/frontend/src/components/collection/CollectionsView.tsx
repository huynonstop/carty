import { useSelectCollectionContext } from '@/features/collection/selectCollection.context';
import classNames from '@/utils/classNames';
import { PropsWithChildren, useState } from 'react';
import Icon from '../base/Icon';
import CollectionCard from './CollectionCard';
import CollectionRow, { HeaderRow } from './CollectionRow';
import {
  CollectionsEmpty,
  CollectionsLoading,
} from './CollectionsSkeleton';
import ToggleViewModeIcon from './ToggleViewModeIcon';

interface CollectionsViewProps {
  collections: Array<any>;
  isLoadingCollections: boolean;
  fetchCollections: () => Promise<void>;
}

function CollectionsView({
  collections,
  isLoadingCollections,
  fetchCollections,
}: CollectionsViewProps) {
  const [viewMode, setViewMode] = useState(true); // true grid, false row
  const { selectId, setSelectId, clearSelect } =
    useSelectCollectionContext();
  const refreshCollections = () => {
    fetchCollections().finally(() => {
      clearSelect();
    });
  };
  let CollectionsElement: JSX.Element = <div></div>;

  if (collections.length) {
    CollectionsElement = Collections(
      collections,
      viewMode,
      selectId,
      setSelectId,
    );
  } else {
    CollectionsElement = <CollectionsEmpty />;
  }
  if (isLoadingCollections) {
    CollectionsElement = <CollectionsLoading />;
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center px-6">
        <h3 className="text-sm font-bold">Your collections</h3>
        <div className="flex items-center gap-4 h-8">
          <div className="flex items-center h-8 gap-1">
            <span className="text-xs font-bold">View mode</span>
            <ToggleViewModeIcon
              type="card"
              isSelected={viewMode}
              setViewMode={() => setViewMode(true)}
            />
            <ToggleViewModeIcon
              type="row"
              isSelected={!viewMode}
              setViewMode={() => setViewMode(false)}
            />
          </div>
          <div className="flex items-center h-8 gap-1">
            <span className="text-xs font-bold">Refresh</span>
            <div
              className="hover:bg-slate-100 rounded"
              onClick={refreshCollections}
            >
              <Icon
                className="h-6 w-6 border rounded"
                type="refresh"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-auto px-6">{CollectionsElement}</div>
    </div>
  );
}

function CollectionItem({
  className,
  onClick,
  isSelected,
  selectedClass,
  children,
}: PropsWithChildren<any>) {
  return (
    <div
      className={classNames([
        className || '',
        isSelected ? selectedClass : '',
      ])}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

function Collections(
  collections: any[],
  viewMode: boolean,
  selectId: string,
  setSelectId: any,
) {
  return viewMode ? (
    <div
      className={classNames([
        'grid grid-cols-1 gap-4',
        'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
      ])}
    >
      {collections.map((collection: any) => {
        return (
          <CollectionItem
            onClick={() => setSelectId(collection.id)}
            isSelected={collection.id === selectId}
            className="border border-transparent cursor-pointer"
            selectedClass="border border-primary rounded-lg"
            key={collection.id}
          >
            <CollectionCard
              isSelected={collection.id === selectId}
              className="flex flex-col rounded-lg p-4 gap-1"
              {...collection}
            />
          </CollectionItem>
        );
      })}
    </div>
  ) : (
    <div className={classNames(['flex flex-col gap-1'])}>
      <HeaderRow className="flex items-center gap-2 font-bold text-sm p-1" />
      {collections.map((collection: any) => {
        return (
          <CollectionItem
            onClick={() => setSelectId(collection.id)}
            isSelected={collection.id === selectId}
            className="cursor-pointer"
            selectedClass="bg-slate-50"
            key={collection.id}
          >
            <CollectionRow
              isSelected={collection.id === selectId}
              className="flex items-center gap-2 p-1"
              {...collection}
            />
          </CollectionItem>
        );
      })}
    </div>
  );
}
export default CollectionsView;
