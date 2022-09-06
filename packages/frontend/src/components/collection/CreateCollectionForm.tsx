import { useAuthContext } from '@/features/auth/auth.context';
import { createCollection } from '@/features/collection/collection.api';
import classNames from '@/utils/classNames';
import { toast } from 'react-toastify';
import Button from '../base/Button';
import { useInput } from '../base/Input';
import TagsInput, { useTagsInput } from '../base/TagsInput';

interface CreateCollectionFormProps {
  onReset: () => void;
  onCreate: (newCollection: any) => void;
}

function CreateCollectionForm({
  onReset,
  onCreate,
}: CreateCollectionFormProps) {
  const { authState } = useAuthContext();
  const { newTag, setNewTag, tags, setTags } = useTagsInput();
  const [name, onChangeName] = useInput('');
  const [description, onChangeDescription] = useInput('');
  return (
    <form
      className="flex flex-col text-primary gap-4"
      onReset={(e) => {
        e.preventDefault();
        onReset();
      }}
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = {
          name,
          description,
          tags,
          accessToken: authState.accessToken,
        };
        try {
          const res = await createCollection(formData);
          const data = await res.json();
          if (res.status !== 200) {
            throw data;
          }
          const { newCollection } = data;
          toast.success(`Created ${name}`);
          onCreate(newCollection);
          onReset();
        } catch (err) {
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
          placeholder="Collection name"
          value={name}
          onChange={onChangeName}
          required
        />
      </label>
      <div className="flex flex-col gap-1">
        <label htmlFor="newTag">Tags</label>
        <TagsInput
          name="newTag"
          id="newTag"
          inputClassName="px-2 py-1 outline-primary border rounded"
          placeholder="New tag"
          newTagValue={newTag}
          onNewTagChange={(tag) => setNewTag(tag)}
          tagsValue={tags}
          onTagsChange={(tags) => setTags(tags)}
        />
      </div>
      <label className="flex flex-col gap-1">
        <span>Description</span>
        <textarea
          id="description"
          name="description"
          className="px-2 py-1 outline-primary border rounded"
          placeholder="Collection description"
          value={description}
          onChange={onChangeDescription}
          rows={5}
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

export default CreateCollectionForm;
