import Modal from '../base/Modal';
import CreateItemForm from './CreateItemForm';

interface CreateItemModalProps {
  isShow: boolean;
  closeModal: () => void;
  createItem: (data: {
    name: string;
    quantity: number;
    price: number;
    description: string;
  }) => Promise<void>;
}
function CreateItemModal({
  isShow,
  closeModal,
  createItem,
}: CreateItemModalProps) {
  return (
    <Modal
      className="w-[32rem] px-12 py-16 rounded-xl"
      isShow={isShow}
    >
      <CreateItemForm
        createItem={createItem}
        closeModal={closeModal}
      />
    </Modal>
  );
}
export default CreateItemModal;
