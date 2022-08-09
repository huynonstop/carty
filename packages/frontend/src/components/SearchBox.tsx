import classNames from '@/utils/classNames';
import { ChangeEventHandler, useRef, useState } from 'react';
import Icon from './base/Icon';

interface SearchBoxProps {
  className?: string;
}

function SearchBox({ className }: SearchBoxProps) {
  const [searchText, setSearchText] = useState('');
  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    setSearchText(e.target.value);
  };
  const searchInputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      className={classNames([
        className || '',
        'flex items-center',
        'h-10 rounded',
        'bg-slate-50 border border-transparent',
        'hover:bg-slate-100',
        'hover:focus-within:bg-slate-200 focus-within:bg-slate-200 focus-within:border-backdrop',
      ])}
      onClick={() => {
        searchInputRef.current?.focus();
      }}
    >
      <Icon type="search" />
      <input
        ref={searchInputRef}
        className="flex-auto bg-inherit outline-none"
        value={searchText}
        onChange={onChangeHandler}
        autoComplete="search"
        id="search"
        name="search"
      />
      {searchText && <Icon type="x" className="hover:bg-slate-100" />}
    </div>
  );
}
export default SearchBox;
