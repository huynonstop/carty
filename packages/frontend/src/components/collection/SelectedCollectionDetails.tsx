import { useAuthContext } from '@/features/auth/auth.context';
import { getCollectionByIdRequest } from '@/features/collection/collection.api';
import { useSelectCollectionContext } from '@/features/collection/selectCollection.context';
import {
  buyPriceReducer,
  totalPriceReducer,
} from '@/features/item/item.utils';
import classNames from '@/utils/classNames';
import { useFetch } from '@/utils/hooks/useFetch';
import { useFetchWithAbortEffect } from '@/utils/hooks/useFetchWithAbortEffect';
import { textDot } from '@/utils/tailwind';
import { useState } from 'react';
import Icon from '../base/Icon';
import Tag from '../base/Tag';

function SelectedCollectionDetails({
  className = '',
}: {
  className: string;
}) {
  const { selectId } = useSelectCollectionContext();
  const { authState, isAuth } = useAuthContext();
  const [isOpen, setIsOpen] = useState(true);
  const [collection, wrapper, { loading, clearData }] =
    useFetch<any>(null);
  useFetchWithAbortEffect(
    (signal) => {
      if (selectId && isAuth()) {
        wrapper(
          getCollectionByIdRequest,
          {
            signal,
            accessToken: authState.accessToken,
            collectionId: selectId,
          },
          (c) => c.collection,
        );
      }
      if (!selectId) {
        clearData();
      }
    },
    [selectId],
  );
  if (!collection || loading) {
    return <></>;
  }
  const { tags, isPublic, items } = collection;
  const totalPrice = totalPriceReducer(items);
  const buyPrice = buyPriceReducer(items);
  return (
    <div className={className}>
      <div className="flex items-center gap-1">
        <Icon
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
          type={isOpen ? 'expandOpen' : 'expandClose'}
          className="rounded hover:bg-slate-200 w-6 h-6 cursor-pointer"
        />
        <span
          className={classNames([
            'text-sm flex-auto font-bold max-w-[80%]',
            textDot,
          ])}
        >
          {collection.name}
        </span>
      </div>
      {isOpen && (
        <div className="flex flex-col px-2 gap-2 text-sm">
          <div className="flex flex-wrap gap-2">
            {tags.map(({ id, label }: any) => {
              return (
                <Tag key={id}>
                  <span className="whitespace-nowrap">{label}</span>
                </Tag>
              );
            })}
          </div>
          <p className="break-all">{collection.description}</p>
          <div>{items.length} items</div>
          <div>Price: {`${buyPrice}$/${totalPrice}$`}</div>
          <div>Status: {isPublic ? 'Public' : 'Private'}</div>
        </div>
      )}
    </div>
  );
}
export default SelectedCollectionDetails;
