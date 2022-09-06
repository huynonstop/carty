import Modal from '../base/Modal';
import CreateItemForm from './CreateItemForm';

interface CreateItemModalProps {
  isShow: boolean;
  onCloseModal: () => void;
  afterCreateItem: (collection: any, items: any[]) => void;
}
function CreateItemModal({
  isShow,
  onCloseModal,
  afterCreateItem,
}: CreateItemModalProps) {
  return (
    <Modal
      className="w-[32rem] px-12 py-16 rounded-xl"
      isShow={isShow}
    >
      <CreateItemForm
        afterCreateItem={afterCreateItem}
        onReset={onCloseModal}
      />
    </Modal>
  );
}
export default CreateItemModal;
