import classNames from '@/utils/classNames';
import { useState } from 'react';
import Button from '../base/Button';
import TagsInput from '../base/TagsInput';

interface CreateCollectionFormProps {
  onReset: () => void;
}

function CreateCollectionForm({
  onReset,
}: CreateCollectionFormProps) {
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  return (
    <form
      className="flex flex-col text-primary gap-2"
      onReset={(e) => {
        e.preventDefault();
        onReset();
      }}
      onSubmit={(e) => {
        e.preventDefault();
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
        />
      </label>
      <div className="flex flex-col gap-1">
        <label htmlFor="newTag">Tags</label>
        <TagsInput
          inputClassName="px-2 py-1 outline-primary border rounded"
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
          rows={5}
        />
      </label>
      <div></div>
      <div className="flex justify-around items-center gap-2">
        <Button
          className={classNames([
            'p-2 bg-white rounded border border-primary ',
            'transition-transform hover:translate-y-1',
          ])}
          type="reset"
        >
          Cancel
        </Button>
        <Button
          className={classNames([
            'bg-primary rounded text-white p-2',
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
