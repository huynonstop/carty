import { useItemsContext } from '@/features/item/items.context';
import Modal from '../base/Modal';
import ItemDetail from './ItemDetail';

interface ItemModalProps {
  editItem: (data: any) => Promise<void>;
  deleteItem: (data: { itemId: string }) => Promise<void>;
}

function ItemModal({ editItem, deleteItem }: ItemModalProps) {
  const { modalItem, setModalItem } = useItemsContext();
  const isShow = !!modalItem;
  const closeModal = () => {
    setModalItem(null);
  };
  if (!isShow) return <></>;
  return (
    <Modal
      className="w-[32rem] px-12 py-16 rounded-xl"
      isShow={isShow}
    >
      <ItemDetail
        item={modalItem}
        editItem={editItem}
        deleteItem={deleteItem}
        closeModal={closeModal}
      />
    </Modal>
  );
}
export default ItemModal;
