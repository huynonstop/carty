import classNames from '@/utils/classNames';
import { WithClassName } from '@/utils/hoc/WithClassName';
import { contentContainerLg } from '@/utils/tailwind';
import Button from '../base/Button';
import EditRowState from '../base/EditRow';
import Icon from '../base/Icon';
import UserLink from '../item/UserLink';

interface CollectionTitleRowProps {
  name: string;
  owner: {
    name: string;
    email: string;
    id: string;
  };
  isOwner: boolean;
  editName: (data: any) => Promise<any>;
  openShareModal: () => void;
  cloneCollection: () => void;
}

function CollectionTitleRow({
  name,
  owner,
  editName,
  openShareModal,
  cloneCollection,
  isOwner,
}: CollectionTitleRowProps) {
  return (
    <WithClassName className="title-row-wrapper flex">
      <WithClassName
        className={[
          'title-row p-8 basis-full',
          contentContainerLg,
          'flex justify-between',
        ]}
      >
        <div className="flex flex-col gap-2">
          <EditRowState
            value={name}
            valueClassName="font-bold text-2xl"
            setValue={editName}
            canEdit={isOwner}
          />
          <p className="text-sm">
            By{' '}
            <UserLink
              className="hover:underline hover:text-blue-600"
              name={owner.name}
              email={owner.email}
              userId={owner.id}
            />
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isOwner && (
            <Button
              onClick={openShareModal}
              className="flex items-center gap-1 bg-primary text-sm text-white rounded p-2"
            >
              <Icon className="w-3 h-3" type="share" />
              <span>Share</span>
            </Button>
          )}
          <Button
            onClick={cloneCollection}
            className={classNames([
              'flex items-center gap-1',
              'whitespace-nowrap text-sm rounded p-2',
              'border border-primary bg-white  text-primary',
            ])}
          >
            <Icon className="w-3 h-3" type="copy" />
            <span>Clone</span>
          </Button>
        </div>
      </WithClassName>
    </WithClassName>
  );
}
export default CollectionTitleRow;
