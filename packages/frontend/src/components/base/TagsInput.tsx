import {
  ChangeEventHandler,
  InputHTMLAttributes,
  KeyboardEventHandler,
  useState,
} from 'react';
import Tag from './Tag';
import TagDeleteButton from './TagDeleteButton';

export const useTagsInput = () => {
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  return {
    newTag,
    setNewTag,
    tags,
    setTags,
  };
};

interface TagsInputProps {
  tagsValue: string[];
  onTagsChange: (tags: string[]) => void;
  newTagValue: string;
  onNewTagChange: (tag: string) => void;
  inputClassName?: string;
}

function TagsInput({
  tagsValue,
  onTagsChange,
  newTagValue,
  onNewTagChange,
  inputClassName = '',
  id,
  name,
  placeholder,
}: TagsInputProps & InputHTMLAttributes<HTMLInputElement>) {
  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onNewTagChange(e.target.value);
  };
  const onKeyDownHandler: KeyboardEventHandler<HTMLInputElement> = (
    e,
  ) => {
    const newTag = newTagValue.trim();
    if (newTag !== '') {
      if (e.key === 'Tab' || e.key === 'Enter') {
        e.preventDefault();
        if (!tagsValue.includes(newTag)) {
          onTagsChange([...tagsValue, newTag]);
          onNewTagChange('');
          return;
        }
      }
    } else {
      if (e.key === 'Backspace' || e.key === 'Delete') {
        onTagsChange(tagsValue.slice(0, -1));
        return;
      }
    }
  };
  const deleteTag = (index: number) => {
    onTagsChange(
      tagsValue.filter((tag, tagIndex) => {
        return tagIndex !== index;
      }),
    );
  };

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {tagsValue.length !== 0 &&
        tagsValue.map((tag, index) => {
          return (
            <Tag key={`${tag}-${index}`}>
              <span className="whitespace-nowrap">{tag}</span>
              <TagDeleteButton onClick={() => deleteTag(index)} />
            </Tag>
          );
        })}
      <input
        className={inputClassName}
        name={name}
        id={id}
        type="text"
        value={newTagValue}
        onChange={onInputChange}
        onKeyDown={onKeyDownHandler}
        placeholder={placeholder}
        size={4}
      />
    </div>
  );
}
export default TagsInput;
