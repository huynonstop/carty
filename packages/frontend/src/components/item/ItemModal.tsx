import { useItemsContext } from '@/features/item/items.context';
import Modal from '../base/Modal';
import ItemDetail from './ItemDetail';

interface ItemModalProps {
  setCollection: (collection: any) => void;
}

function ItemModal({ setCollection }: ItemModalProps) {
  const { modalItem, setModalItem, setItems } = useItemsContext();
  const onCloseModal = () => {
    setModalItem(null);
  };
  const afterEdit = (collection: any, items: any[]) => {
    setCollection(collection);
    setModalItem(null);
    setItems(items);
  };
  const afterDelete = (collection: any, items: any[]) => {
    setCollection(collection);
    setModalItem(null);
    setItems(items);
  };
  if (!modalItem) return <></>;
  return (
    <Modal
      className="w-[32rem] px-12 py-16 rounded-xl"
      isShow={!!modalItem}
    >
      <ItemDetail
        item={modalItem}
        afterEdit={afterEdit}
        afterDelete={afterDelete}
        onReset={onCloseModal}
      />
    </Modal>
  );
}
export default ItemModal;
