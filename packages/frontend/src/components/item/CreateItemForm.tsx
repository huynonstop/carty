import classNames from '@/utils/classNames';
import { toast } from 'react-toastify';
import Button from '../base/Button';
import { useInput } from '../base/Input';

interface CreateItemFormProps {
  closeModal: () => void;
  createItem: (data: {
    name: string;
    quantity: number;
    price: number;
    description: string;
  }) => Promise<void>;
}

function CreateItemForm({
  closeModal,
  createItem,
}: CreateItemFormProps) {
  const [name, onChangeName] = useInput('');
  const [quantity, onChangeQuantity] = useInput(1);
  const [price, onChangePrice] = useInput(0);
  const [description, onChangeDescription] = useInput('');

  return (
    <form
      className="flex flex-col text-primary gap-4"
      onReset={(e) => {
        e.preventDefault();
        closeModal();
      }}
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          await createItem({
            name,
            quantity,
            price,
            description,
          });
          toast.success(`Created ${name}`);
          closeModal();
        } catch (error) {
          toast.error('Create failed');
        }
      }}
    >
      <label className="flex flex-col gap-1">
        <span>Name</span>
        <input
          type="text"
          id="name"
          name="name"
          className="px-2 py-1 outline-primary border rounded"
          placeholder="Item name"
          value={name}
          onChange={onChangeName}
          required
        />
      </label>
      <label className="flex flex-col gap-1">
        <span>Quantity</span>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          step="1"
          className="px-2 py-1 outline-primary border rounded"
          placeholder="1"
          value={quantity}
          onChange={onChangeQuantity}
          required
        />
      </label>
      <label className="flex flex-col gap-1">
        <span>Price</span>
        <input
          type="number"
          id="price"
          name="price"
          className="px-2 py-1 outline-primary border rounded"
          placeholder="1.00 (USD)"
          value={price}
          onChange={onChangePrice}
          required
        />
      </label>
      <label className="flex flex-col gap-1">
        <span>Description</span>
        <textarea
          id="description"
          name="description"
          className="px-2 py-1 outline-primary border rounded"
          placeholder="Item description"
          rows={5}
          value={description}
          onChange={onChangeDescription}
        />
      </label>
      <div className="flex justify-between items-center gap-2">
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
          Create
        </Button>
      </div>
    </form>
  );
}

export default CreateItemForm;
