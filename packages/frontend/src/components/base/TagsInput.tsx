import { ChangeEventHandler, KeyboardEventHandler } from 'react';

interface TagsInputProps {
  tagsValue: string[];
  onTagsChange: (tags: string[]) => void;
  newTagValue: string;
  onNewTagChange: (tag: string) => void;
}

function TagsInput({
  tagsValue,
  onTagsChange,
  newTagValue,
  onNewTagChange,
}: TagsInputProps) {
  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onNewTagChange(e.target.value);
  };

  const onKeyDownHandler: KeyboardEventHandler<HTMLInputElement> = (
    e,
  ) => {
    const newTag = newTagValue.trim();
    if (newTag !== '') {
      if (e.key === 'Tab' || e.key === 'Enter') {
        onTagsChange([...tagsValue, newTag]);
        onNewTagChange('');
        return;
      }
    } else {
      if (e.key === 'Backspace' || e.key === 'Delete') {
        onTagsChange(tagsValue.slice(0, -1));
        return;
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div>{tagsValue.join(' ')}</div>
      <div>
        <input
          className="px-1"
          size={5}
          type="text"
          value={newTagValue}
          onChange={onInputChange}
          onKeyDown={onKeyDownHandler}
        />
      </div>
    </div>
  );
}
export default TagsInput;
