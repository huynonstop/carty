import {
  buyPriceReducer,
  totalPriceReducer,
} from '@/features/item/item.utils';
import { justUpdated, lastUpdateBefore } from '@/utils/time';
import EditGroupState from '../base/EditGroup';
import Tag from '../base/Tag';
import TagsInput, { useTagsInput } from '../base/TagsInput';

interface CollectionDetailSidebarProps {
  collectionTags: Array<any>;
  description: string;
  updatedAt: string;
  createdAt: string;
  items: Array<any>;
  className: string;
  editCollection: (patch: 'description' | 'tags') => any;
  isOwner: boolean;
}

function CollectionDetailSidebar({
  className = '',
  collectionTags,
  description,
  updatedAt,
  createdAt,
  items,
  editCollection,
  isOwner,
}: CollectionDetailSidebarProps) {
  const { newTag, setNewTag } = useTagsInput();
  const totalPrice = totalPriceReducer(items);
  const buyPrice = buyPriceReducer(items);
  const lastUpdateStatus = lastUpdateBefore(updatedAt);
  return (
    <div className={className}>
      <EditGroupState
        canEdit={isOwner}
        className="flex flex-col gap-1"
        label="Tags"
        value={collectionTags.map(({ label }) => label)}
        setValue={editCollection('tags')}
        inputElement={({ editValue, setEditValue }) => {
          return (
            <TagsInput
              inputClassName="px-2 py-1 outline-primary border rounded"
              placeholder="New tag"
              tagsValue={editValue}
              newTagValue={newTag}
              onNewTagChange={(tag) => setNewTag(tag)}
              onTagsChange={(tags) => setEditValue(tags)}
            />
          );
        }}
      >
        <div className="flex flex-wrap gap-2 text-sm">
          {collectionTags.map(({ id, label }: any) => {
            return (
              <Tag key={id}>
                <span className="whitespace-nowrap">{label}</span>
              </Tag>
            );
          })}
        </div>
      </EditGroupState>

      <EditGroupState
        canEdit={isOwner}
        className="flex flex-col gap-1"
        label="Description"
        value={description}
        setValue={editCollection('description')}
        inputElement={({ editValue, setEditValue }) => {
          return (
            <input
              className="outline-none text-sm border border-primary rounded px-1"
              autoFocus
              value={editValue}
              onChange={(e) => {
                setEditValue(e.target.value);
              }}
            />
          );
        }}
      >
        <p className="text-sm">{description}</p>
      </EditGroupState>

      <div className="flex flex-col gap-1">
        <strong>Details</strong>
        <div className="text-sm">
          <div className="whitespace-nowrap">
            Total {`${buyPrice}$/${totalPrice}$`}
          </div>
          <div>
            <span>
              {lastUpdateStatus === justUpdated
                ? lastUpdateStatus
                : `Last updated ${lastUpdateStatus}`}
            </span>
          </div>
          <div>
            Created at{' '}
            <span>{new Date(createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CollectionDetailSidebar;
