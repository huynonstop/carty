import CollectionTitleRow from '@/components/collection/CollectionTitleRow';
import CollectionDetailSidebar from '@/components/collection/CollectionDetailSidebar';
import CreateItemCard from '@/components/item/CreateItemCard';
import ItemsView from '@/components/item/ItemsView';
import { useAuthContext } from '@/features/auth/auth.context';
import {
  cloneCollection,
  deleteCollection,
  getCollectionById,
  updateCollection,
} from '@/features/collection/collection.api';
import { WithClassName } from '@/utils/hoc/WithClassName';
import { useFetch } from '@/utils/hooks/useFetch';
import { useToggleModal } from '@/utils/hooks/useModal';
import { contentContainerLg } from '@/utils/tailwind';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CreateItemModal from '@/components/item/CreateItemModal';
import { useItemsContext } from '@/features/item/items.context';
import ItemModal from '@/components/item/ItemModal';
import MoreCollectionSidebar from '@/components/collection/MoreCollectionSidebar';
import { toast } from 'react-toastify';
import Spinner from '@/components/Spinner';
import ShareModal from '@/components/share/ShareModal';
function CollectionDetailPage() {
  const [
    isShowCreateItemModal,
    closeCreateItemModal,
    openCreateItemModal,
  ] = useToggleModal(false);
  const [isShowShareModal, closeShareModal, openShareModal] =
    useToggleModal(false);
  const { authState, isAuth } = useAuthContext();
  const [collection, wrapper, { setData, loading }] =
    useFetch<any>(null);
  const navigate = useNavigate();
  const { collectionId } = useParams();
  const { items, setItems } = useItemsContext();
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    if (isAuth())
      wrapper(
        getCollectionById,
        {
          accessToken: authState.accessToken,
          collectionId,
        },
        (c) => c.collection,
        (c) => {
          setItems(c.collection.items);
          setIsUser(c.isUser);
        },
      );
  }, [collectionId]);

  if (!collection) {
    return <></>;
  }
  if (loading) {
    return (
      <div>
        <Spinner
          spinnerClassName="reverse scale-[3]"
          className="p-8"
        />
      </div>
    );
  }
  const {
    id,
    ownerId,
    owner,
    tags,
    name,
    description,
    updatedAt,
    createdAt,
    isPublic,
  } = collection;
  const isOwner = authState.userId === ownerId;
  const onDeleteCollection = async () => {
    try {
      const res = await deleteCollection({
        collectionId: id,
        accessToken: authState.accessToken,
      });
      const data = await res.json();
      if (res.status !== 200) {
        throw data;
      }
      toast.success('Deleted collection');
      navigate('/collections', { replace: true });
    } catch (err) {
      toast.error('Delete failed');
    }
  };
  const editCollection =
    (patch: 'name' | 'description' | 'isPublic' | 'tags') =>
    async (data: any) => {
      try {
        const res = await updateCollection({
          patch,
          accessToken: authState.accessToken,
          collectionId: id,
          [patch]: data,
        });
        const resData = await res.json();
        if (res.status !== 200) {
          throw data;
        }
        setData(resData.updatedCollection);
      } catch (err) {
        throw err;
      }
    };
  const cloneThisCollection = async () => {
    if (!collectionId) return;
    try {
      const res = await cloneCollection({
        collectionId,
        accessToken: authState.accessToken,
      });
      const data = await res.json();
      if (res.status !== 200) {
        throw data;
      }
      navigate(`/collections/${data.clonedCollection.id}`);
    } catch (err) {
      toast.error('Clone fail');
    }
  };
  const afterCreateItem = (collection: any, items: any[]) => {
    setData(collection);
    setItems(items);
  };
  return (
    <div className="flex flex-col w-full">
      <CollectionTitleRow
        editName={editCollection('name')}
        openShareModal={openShareModal}
        name={name}
        owner={owner}
        isOwner={isOwner}
        cloneCollection={cloneThisCollection}
      />
      <WithClassName
        className={[
          'content-row w-full p-8',
          'flex justify-between gap-[2%]',
          'flex-col sm:flex-row',
          contentContainerLg,
        ]}
      >
        <CollectionDetailSidebar
          className="flex flex-col basis-[25%] gap-4"
          collectionTags={tags}
          description={description}
          updatedAt={updatedAt}
          createdAt={createdAt}
          items={items}
          editCollection={editCollection}
          isOwner={isOwner}
        />
        <div className="flex flex-col flex-auto gap-4">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-2xl">
              <strong>Items</strong>
            </h4>
            {isUser && (
              <CreateItemCard openCreateModal={openCreateItemModal} />
            )}
          </div>
          <ItemsView setCollection={setData} isUser={isUser} />
        </div>
        <WithClassName
          className={['sm:basis-[15%] sm:max-w-[10rem]']}
        >
          <MoreCollectionSidebar
            ownerId={ownerId}
            isOwner={isOwner}
            className="flex flex-col gap-4"
            onDelete={onDeleteCollection}
          />
        </WithClassName>
      </WithClassName>
      {isUser && (
        <CreateItemModal
          isShow={isShowCreateItemModal}
          onCloseModal={closeCreateItemModal}
          afterCreateItem={afterCreateItem}
        />
      )}
      {isUser && <ItemModal setCollection={setData} />}
      {isOwner && (
        <ShareModal
          collectionId={id}
          onSwitchPublic={async () => {
            try {
              await editCollection('isPublic')(!isPublic);
            } catch (err) {
              console.log(err);
            }
          }}
          isPublic={isPublic}
          isShow={isShowShareModal}
          onCloseModal={closeShareModal}
        />
      )}
    </div>
  );
}

export default CollectionDetailPage;
