import CreateCollectionCard from '@/components/collection/CreateCollectionCard';
import CreateCollectionModal from '@/components/collection/CreateCollectionModal';
import ToggleViewModeIcon from '@/components/collection/ToggleViewModeIcon';
import Sidebar from '@/components/Sidebar';
import { useToggleModal } from '@/utils/hooks/useModal';

function CollectionPage() {
  const [
    isShowCreateCollectionModal,
    closeCreateCollectionModal,
    openCreateCollectionModal,
  ] = useToggleModal(false);
  return (
    <>
      <div className="flex flex-col flex-auto gap-4">
        <div className="flex sticky shadow-card p-6 gap-8">
          <CreateCollectionCard
            openCreateModal={openCreateCollectionModal}
          />
          <div>Use a template</div>
        </div>
        <div className="flex justify-between items-center px-6">
          <h3 className="text-sm font-bold">Your collections</h3>
          <div className="flex items-center gap-2 h-8">
            <span className="text-xs font-bold">View mode:</span>
            <ToggleViewModeIcon type="row" isSelected={true} />
            <ToggleViewModeIcon type="card" />
          </div>
        </div>
        <div className="flex-auto px-6">
          Collections (view by card or row)
        </div>
      </div>
      <CreateCollectionModal
        isShow={isShowCreateCollectionModal}
        onCloseModal={closeCreateCollectionModal}
      />
    </>
  );
}

export default CollectionPage;
