import Modal from '../base/Modal';
import CreateCollectionForm from './CreateCollectionForm';

interface CreateCollectionModalProps {
  isShow: boolean;
  onCloseModal: () => void;
  onCreate: (newCollection: any) => void;
}
function CreateCollectionModal({
  isShow,
  onCloseModal,
  onCreate,
}: CreateCollectionModalProps) {
  return (
    <Modal
      className="w-[32rem] px-12 py-16 rounded-xl"
      isShow={isShow}
    >
      <CreateCollectionForm
        onCreate={onCreate}
        onReset={onCloseModal}
      />
    </Modal>
  );
}
export default CreateCollectionModal;
