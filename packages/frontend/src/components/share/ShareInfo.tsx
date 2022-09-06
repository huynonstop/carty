import { unshareCollection } from '@/features/share/share.api';
import Icon from '../base/Icon';

interface ShareInfoProps {
  shareId: string;
  userEmail: string;
  userName: string;
  unshareCollection: () => void;
}
function ShareInfo({
  userEmail,
  userName,
  unshareCollection,
}: ShareInfoProps) {
  return (
    <div className="flex justify-between py-1 px-2  hover:bg-slate-100 transition rounded">
      <div className="flex flex-col text-primary">
        <div>
          <strong className="text-sm">{userEmail}</strong>
        </div>
        <div className="text-xs">{userName}&nbsp;</div>
      </div>
      <div className="flex items-center">
        <Icon
          onClick={() => unshareCollection()}
          type="x"
          className="w-4 h-4 cursor-pointer hover:bg-slate-200 rounded"
        />
      </div>
    </div>
  );
}
export default ShareInfo;
