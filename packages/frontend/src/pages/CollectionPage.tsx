import SectionDiv from '@/components/base/SectionDiv';
import CloneCollectionCard from '@/components/collection/CloneCollectionCard';
import CollectionsView from '@/components/collection/CollectionsView';
import CreateCollectionCard from '@/components/collection/CreateCollectionCard';
import CreateCollectionModal from '@/components/collection/CreateCollectionModal';
import { useAuthContext } from '@/features/auth/auth.context';
import { getCollections } from '@/features/collection/collection.api';
import { useFetch } from '@/utils/hooks/useFetch';
import { useToggleModal } from '@/utils/hooks/useModal';
import { useEffect } from 'react';

function CollectionPage() {
  const [
    isShowCreateCollectionModal,
    closeCreateCollectionModal,
    openCreateCollectionModal,
  ] = useToggleModal(false);
  const { authState, isAuth } = useAuthContext();
  const [collections, wrapper, { loading, setData }] = useFetch<
    any[]
  >([]);
  const fetchCollections = () => {
    return wrapper(
      getCollections,
      {
        accessToken: authState.accessToken,
      },
      (cs) => cs.collections,
    );
  };
  useEffect(() => {
    if (isAuth()) {
      fetchCollections();
    }
  }, [authState]);

  const onCreate = (newCollection: any) => {
    setData([newCollection, ...collections]);
  };
  return (
    <>
      <div className="flex flex-col flex-auto index-max-w-screen-xl-sidebar-width gap-4 border-l">
        <div>
          <div className="flex sticky top-0 p-6 gap-8 bg-white">
            <CreateCollectionCard
              className="basis-[25%] flex-wrap"
              openCreateModal={openCreateCollectionModal}
            />
            <CloneCollectionCard className="basis-[25%] flex-wrap" />
          </div>
          <SectionDiv className="mx-2" />
        </div>
        <CollectionsView
          collections={collections}
          isLoadingCollections={loading}
          fetchCollections={fetchCollections}
        />
      </div>
      <CreateCollectionModal
        onCreate={onCreate}
        isShow={isShowCreateCollectionModal}
        onCloseModal={closeCreateCollectionModal}
      />
    </>
  );
}

export default CollectionPage;
