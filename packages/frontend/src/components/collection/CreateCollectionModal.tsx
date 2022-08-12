import Modal from '../base/Modal';
import CreateCollectionForm from './CreateCollectionForm';

interface CreateCollectionModalProps {
  isShow: boolean;
  onCloseModal: () => void;
}
function CreateCollectionModal({
  isShow,
  onCloseModal,
}: CreateCollectionModalProps) {
  return (
    <Modal className="w-[32rem]" isShow={isShow}>
      <CreateCollectionForm onReset={onCloseModal} />
    </Modal>
  );
}
export default CreateCollectionModal;
