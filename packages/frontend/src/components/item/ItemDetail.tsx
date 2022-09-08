import { useAuthContext } from '@/features/auth/auth.context';
import {
  deleteItemRequest,
  updateItemRequest,
} from '@/features/item/item.api';
import classNames from '@/utils/classNames';
import useFormRef from '@/utils/hooks/useFormRef';
import { FormEventHandler, MouseEventHandler } from 'react';
import { toast } from 'react-toastify';
import Button from '../base/Button';
import UserLink from './UserLink';

interface ItemDetailProps {
  item: any;
  closeModal: () => void;
  editItem: (data: any) => Promise<void>;
  deleteItem: (data: { itemId: string }) => Promise<void>;
}

function ItemDetail({
  item,
  closeModal,
  editItem,
  deleteItem,
}: ItemDetailProps) {
  const { authState } = useAuthContext();
  const {
    id,
    name,
    quantity,
    price,
    description,
    collectionId,
    buyerId,
    buyer,
  } = item;
  const canBuy = !!buyerId;
  const isBuyer = buyerId === authState.userId;
  const [formRef, { createInputRef, getFormData }] = useFormRef();
  const onCancelHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    closeModal();
  };
  const onSubmitHandler: FormEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault();
    try {
      await editItem({
        itemId: id,
        ...getFormData(),
      });
      toast.success('Update successfully');
    } catch (err) {
      toast.error('Update failed');
    }
  };
  const onDeleteHandler: MouseEventHandler<
    HTMLButtonElement
  > = async (e) => {
    try {
      await deleteItem({ itemId: id });
      toast.success('Deleted');
    } catch (err) {
      toast.error('Something went wrong');
    }
  };
  return (
    <form
      className="flex flex-col text-primary gap-4"
      onReset={onCancelHandler}
      onSubmit={onSubmitHandler}
    >
      <label className="flex flex-col gap-1">
        <span>Name</span>
        <input
          ref={createInputRef('name')}
          type="text"
          id="name"
          name="name"
          className="px-2 py-1 outline-primary border rounded"
          defaultValue={name}
          required
        />
      </label>
      <label className="flex flex-col gap-1">
        <span>Quantity</span>
        <input
          ref={createInputRef('quantity')}
          type="number"
          id="quantity"
          name="quantity"
          min="0"
          step="1"
          className="px-2 py-1 outline-primary border rounded"
          required
          defaultValue={quantity}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span>Price</span>
        <input
          ref={createInputRef('price')}
          type="number"
          id="price"
          name="price"
          className="px-2 py-1 outline-primary border rounded"
          placeholder="1.00 (USD)"
          defaultValue={price}
          required
        />
      </label>
      <label className="flex flex-col gap-1">
        <span>Description</span>
        <textarea
          ref={createInputRef('description')}
          id="description"
          name="description"
          className="px-2 py-1 outline-primary border rounded"
          placeholder="Item description"
          rows={5}
          defaultValue={description}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span>Mark as brought</span>
        <div className="flex items-center gap-1 h-6">
          <input
            ref={createInputRef('canBuy')}
            type="checkbox"
            id="canBuy"
            name="canBuy"
            defaultChecked={canBuy}
          />
          {buyer ? (
            <UserLink
              userClassName="hover:underline hover:text-blue-600"
              className="flex gap-1"
              email={buyer.email}
              name={buyer.name}
              userId={buyer.id}
              isUser={isBuyer}
            >
              <span>by</span>
            </UserLink>
          ) : (
            <></>
          )}
        </div>
      </label>
      <div className="flex justify-between items-center gap-2">
        <Button
          type="button"
          className={classNames([
            'py-2 px-4 text-white bg-red-500 rounded border border-red-500 ',
            'transition-transform hover:translate-y-1',
          ])}
          onClick={onDeleteHandler}
        >
          Delete
        </Button>

        <Button
          className={classNames([
            'py-2 px-4 bg-white rounded border border-primary ',
            'transition-transform hover:translate-y-1',
          ])}
          type="reset"
        >
          Cancel
        </Button>
        <Button
          className={classNames([
            'bg-primary rounded text-white py-2 px-4',
            'transition-transform hover:translate-y-1',
          ])}
          type="submit"
        >
          Confirm
        </Button>
      </div>
    </form>
  );
}

export default ItemDetail;
