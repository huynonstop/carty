import { useAuthContext } from '@/features/auth/auth.context';
import { searchUserCollection } from '@/features/collection/collection.api';
import { debounced } from '@/utils';
import classNames from '@/utils/classNames';
import { WithClassName } from '@/utils/hoc/WithClassName';
import { useFetch } from '@/utils/hooks/useFetch';
import { textDot } from '@/utils/tailwind';
import { ChangeEventHandler, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from './base/Icon';
import { useInput } from './base/Input';
import Tag from './base/Tag';

interface SearchBoxProps {
  className?: string;
}

function SearchBox({ className = '' }: SearchBoxProps) {
  const { authState } = useAuthContext();
  const [searchText, _, setSearchText] = useInput('');
  const [searchCollections, wrapper, { setData }] = useFetch<any[]>(
    [],
  );
  const debouncedWrapper = useCallback(debounced(wrapper, 1000), []);
  const clearSearch = () => {
    setSearchText('');
    setData([]);
  };
  const onChangeHandler: ChangeEventHandler<
    HTMLInputElement
  > = async (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    if (searchText === '') {
      setData([]);
    } else {
      debouncedWrapper(
        searchUserCollection,
        {
          accessToken: authState.accessToken,
          key: searchText,
          take: 5,
        },
        (data: any) => data.collections,
      );
    }
  };
  console.log(searchCollections);
  return (
    <form
      className={classNames([
        className,
        'flex items-center px-2',
        'h-10 rounded',
        'bg-slate-50 border border-transparent',
        'hover:bg-slate-100',
        'hover:focus-within:bg-slate-200 focus-within:bg-slate-200 focus-within:border-backdrop',
        'relative dropdown-wrapper group',
      ])}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Icon type="search" />
      <input
        className="flex-auto bg-inherit outline-none"
        value={searchText}
        onChange={onChangeHandler}
        autoComplete="search"
        placeholder="Find your collections"
        id="search"
        name="search"
      />
      {searchText && (
        <Icon
          type="x"
          className="hover:bg-slate-100 rounded p-1"
          onClick={clearSearch}
        />
      )}
      <WithClassName
        className={[
          'dropdown',
          'absolute top-[100%] left-0 right-0',
          'z-10 bg-white border',
          'hidden group-focus-within:block',
          'flex flex-col',
        ]}
      >
        {searchCollections.length ? (
          searchCollections.map(({ id, name, tags }) => {
            return (
              <Link
                className="p-2 hover:bg-slate-100 transition flex items-center justify-between"
                key={id}
                to={`/collections/${id}`}
              >
                <span>{name}</span>
                <div className="flex items-center gap-1">
                  {tags.slice(0, 5).map(({ label }: any) => {
                    return (
                      <Tag
                        className={classNames([
                          'rounded bg-slate-200 px-1 text-sm',
                          'max-w-[4rem]',
                        ])}
                        key={label}
                      >
                        <span className={textDot}>{label}</span>
                      </Tag>
                    );
                  })}
                </div>
              </Link>
            );
          })
        ) : (
          <div className="p-2">Not found any collection</div>
        )}
      </WithClassName>
    </form>
  );
}
export default SearchBox;
