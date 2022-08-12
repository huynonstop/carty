import { ChangeEventHandler, KeyboardEventHandler } from 'react';
import Button from './Button';
import { IconSvg } from './Icon';
import Tag from './Tag';

interface TagsInputProps {
  tagsValue: string[];
  onTagsChange: (tags: string[]) => void;
  newTagValue: string;
  onNewTagChange: (tag: string) => void;
  inputClassName?: string;
}

function DeleteIcon({ onClick }: any) {
  return (
    <Button
      onClick={(e) => {
        e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();
        onClick();
      }}
      className="inline-flex items-center"
    >
      <IconSvg type="svg" className="w-4 h-4 pt-[2px]">
        <svg
          className="svg "
          width="10"
          height="10"
          viewBox="0 0 10 10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 5.71l3.646 3.647.707-.707-3.646-3.647 3.646-3.646L8.646.65 5 4.296 1.353.65l-.707.707 3.646 3.646L.646 8.65l.707.707L5 5.71z"
            fillRule="nonzero"
            fillOpacity="1"
            className="fill-primary"
            stroke="none"
          ></path>
        </svg>
      </IconSvg>
    </Button>
  );
}

function TagsInput({
  tagsValue,
  onTagsChange,
  newTagValue,
  onNewTagChange,
  inputClassName = '',
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
            <Tag
              key={`${tag}-${index}`}
              className="rounded bg-slate-200 px-2"
            >
              <span className="break-all">{tag}</span>
              <DeleteIcon onClick={() => deleteTag(index)} />
            </Tag>
          );
        })}
      <input
        className={inputClassName}
        name="newTag"
        id="newTag"
        type="text"
        value={newTagValue}
        onChange={onInputChange}
        onKeyDown={onKeyDownHandler}
        placeholder="New tag"
        size={4}
      />
    </div>
  );
}
export default TagsInput;
