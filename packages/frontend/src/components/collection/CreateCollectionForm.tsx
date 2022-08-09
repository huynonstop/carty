import { useState } from 'react';
import TagsInput from '../base/TagsInput';

function CreateCollectionForm() {
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  return (
    <div>
      <TagsInput
        newTagValue={newTag}
        onNewTagChange={(tag) => setNewTag(tag)}
        tagsValue={tags}
        onTagsChange={(tags) => setTags(tags)}
      />
    </div>
  );
}
export default CreateCollectionForm;
