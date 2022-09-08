import Card from '@/components/base/Card';
import { useInput } from '@/components/base/Input';
import Tag from '@/components/base/Tag';
import {
  CommunitySearchBox,
  useCommunitySearchBox,
  useElementObserver,
} from '@/components/SearchBox';
import { useAuthContext } from '@/features/auth/auth.context';
import { searchCollectionsRequest } from '@/features/collection/collection.api';
import { getMostPopularTagsRequest } from '@/features/tag/tag.api';
import { debounced } from '@/utils';
import { WithClassName } from '@/utils/hoc/WithClassName';
import { useFetch } from '@/utils/hooks/useFetch';
import { textDot } from '@/utils/tailwind';
import { ChangeEventHandler, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TagColors = [
  '#8D948D',
  '#CC0605',
  '#20214F',
  '#025669',
  '#063971',
  '#382C1E',
  '#922B3E',
  '#6C4675',
  '#317F43',
  '#ED760E',
];
const seed = Date.now();

function CommunityPage() {
  const { authState, isAuth } = useAuthContext();
  const [popularTags, tagsWrapper] = useFetch<any[]>([]);
  useEffect(() => {
    if (isAuth()) {
      tagsWrapper(
        getMostPopularTagsRequest,
        {
          accessToken: authState.accessToken,
          take: 10,
        },
        (tags) => tags.mostPopularTags,
      );
    }
  }, []);
  const {
    searchText,
    searchCommunityCollections,
    onChangeHandler,
    clearSearch,
    fetchMore,
    setSearchText,
    canFetchMore,
  } = useCommunitySearchBox(authState.accessToken);
  const { setElementObserver } = useElementObserver(fetchMore);
  return (
    <WithClassName
      className={['flex flex-col w-full', 'p-2 gap-8 text-black']}
    >
      <section className="flex flex-col items-center py-12 gap-4">
        <h1 className="text-5xl font-bold">
          Add a little{' '}
          <strong className="text-primary-2">idea</strong> to your
          cart
        </h1>
        <p className="text-xl">
          Discover inspiring collections, recipes, mockups, and more.
        </p>
        <CommunitySearchBox
          className="w-3/4 border border-primary"
          searchTextValue={searchText}
          searchTextChangeHandler={onChangeHandler}
          clearTextValue={clearSearch}
        />
        <div className="flex flex-wrap items-center py-4 gap-2 justify-evenly">
          {popularTags.length ? (
            popularTags.map(({ id, label }, idx) => {
              return (
                <Tag
                  key={id}
                  style={{
                    backgroundColor:
                      TagColors[(idx + seed) % TagColors.length],
                  }}
                  className="text-white rounded px-4 py-2 cursor-pointer"
                >
                  <span
                    className="font-bold"
                    onClick={() => setSearchText(label)}
                  >
                    #{label}
                  </span>
                </Tag>
              );
            })
          ) : (
            <div>Not found any tags</div>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl whitespace-nowrap">
          <strong>By the community, for the community</strong>
        </h1>
        <div className="flex flex-col gap-4 items-center">
          {searchCommunityCollections.length ? (
            searchCommunityCollections.map(
              (
                {
                  id,
                  name,
                  description,
                  tags,
                  owner,
                  items,
                }: {
                  id: string;
                  name: string;
                  description: string;
                  tags: any[];
                  owner: {
                    name: string;
                    email: string;
                  };
                  items: any[];
                },
                i,
              ) => {
                return (
                  <div
                    key={id}
                    className="w-full"
                    ref={
                      i === searchCommunityCollections.length - 1
                        ? (el) => setElementObserver(el)
                        : undefined
                    }
                  >
                    <Link to={`/collections/${id}`}>
                      <Card className="rounded-3xl py-6 px-12 transition hover:bg-slate-50 select-none cursor-pointer gap-2 flex flex-col">
                        <div className="flex flex-col">
                          <div className={textDot}>
                            <strong>{name}</strong>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <WithClassName>
                              by {owner.name || owner.email}
                            </WithClassName>
                            <WithClassName
                              className={['flex justify-center']}
                            >
                              {items.length} items
                            </WithClassName>
                          </div>
                        </div>

                        <WithClassName
                          className={['flex gap-2 overflow-hidden']}
                        >
                          {tags.map(({ id, label }: any) => {
                            return (
                              <Tag key={id}>
                                <span className="text-primary text-sm">
                                  {label}
                                </span>
                              </Tag>
                            );
                          })}
                        </WithClassName>
                        <WithClassName
                          className={[textDot, 'text-sm']}
                        >
                          {description}
                        </WithClassName>
                      </Card>
                    </Link>
                  </div>
                );
              },
            )
          ) : (
            <div>Not found</div>
          )}
          {!canFetchMore && <div>No more collection</div>}
        </div>
      </section>
    </WithClassName>
  );
}
export default CommunityPage;
