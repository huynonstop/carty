import CollectionTitleRow from '@/components/collection/CollectionTitleRow';
import CollectionDetailSidebar from '@/components/collection/CollectionDetailSidebar';
import CreateItemCard from '@/components/item/CreateItemCard';
import ItemsView from '@/components/item/ItemsView';
import { WithClassName } from '@/utils/hoc/WithClassName';
import { useToggleModal } from '@/utils/hooks/useModal';
import { contentContainerLg } from '@/utils/tailwind';
import CreateItemModal from '@/components/item/CreateItemModal';
import ItemModal from '@/components/item/ItemModal';
import MoreCollectionSidebar from '@/components/collection/MoreCollectionSidebar';
import Spinner from '@/components/Spinner';
import ShareModal from '@/components/share/ShareModal';
import { useCollectionDetailPageData } from './useCollectionDetailPageData';
import { toast } from 'react-toastify';

function CollectionDetailPage() {
  const [
    isShowCreateItemModal,
    closeCreateItemModal,
    openCreateItemModal,
  ] = useToggleModal(false);
  const [isShowShareModal, closeShareModal, openShareModal] =
    useToggleModal(false);

  const {
    collection,
    items,
    isUser,
    loading,
    authState,
    collectionId,
    navigate,
    editCollection,
    cloneThisCollection,
    deleteCollection,
    createItem,
    editItem,
    toggleItem,
    deleteItem,
  } = useCollectionDetailPageData();

  if (!collectionId) {
    navigate('/collections');
    return <></>;
  }

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
          className="flex flex-col sm:basis-[25%] sm:max-w-[10rem] gap-4"
          collectionTags={tags}
          description={description}
          updatedAt={updatedAt}
          createdAt={createdAt}
          items={items}
          editCollection={editCollection}
          isOwner={isOwner}
          isUser={isUser}
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
          <ItemsView toggleItem={toggleItem} isUser={isUser} />
        </div>
        <WithClassName
          className={['sm:basis-[15%] sm:max-w-[10rem]']}
        >
          <MoreCollectionSidebar
            ownerId={ownerId}
            isOwner={isOwner}
            className="flex flex-col gap-4"
            deleteCollection={deleteCollection}
          />
        </WithClassName>
      </WithClassName>
      {isUser && (
        <CreateItemModal
          isShow={isShowCreateItemModal}
          closeModal={closeCreateItemModal}
          createItem={createItem}
        />
      )}
      {isUser && (
        <ItemModal editItem={editItem} deleteItem={deleteItem} />
      )}
      {isOwner && (
        <ShareModal
          collectionId={id}
          switchPublic={async () => {
            try {
              await editCollection('isPublic')(!isPublic);
            } catch (err) {
              toast.error('Switch status failed');
            }
          }}
          isPublic={isPublic}
          isShow={isShowShareModal}
          closeModal={closeShareModal}
        />
      )}
    </div>
  );
}

export default CollectionDetailPage;
