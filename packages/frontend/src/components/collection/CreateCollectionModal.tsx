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
    <Modal isShow={isShow} onCloseModal={onCloseModal}>
      <CreateCollectionForm />
    </Modal>
  );
}
export default CreateCollectionModal;
