import { useAuthContext } from '@/features/auth/auth.context';
import {
  getSharedUsersRequest,
  shareCollectionRequest,
  unshareCollectionRequest,
} from '@/features/share/share.api';
import { useFetch } from '@/utils/hooks/useFetch';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import Button from '../base/Button';
import Modal from '../base/Modal';
import Switch from '../base/Switch';
import ShareInfo from './ShareInfo';

interface ShareModalProps {
  isShow: boolean;
  isPublic: boolean;
  closeModal: () => void;
  switchPublic: () => void;
  collectionId: string;
}
function ShareModal({
  isShow,
  closeModal,
  isPublic,
  switchPublic,
  collectionId,
}: ShareModalProps) {
  const { authState, isAuth } = useAuthContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [users, wrapper, { setData }] = useFetch<any[]>([]);
  useEffect(() => {
    if (isAuth()) {
      wrapper(
        getSharedUsersRequest,
        {
          collectionId,
          accessToken: authState.accessToken,
        },
        (data) => data.collectionUser,
      );
    }
  }, []);
  const shareToEmail = async (email: string) => {
    try {
      const res = await shareCollectionRequest({
        collectionId,
        accessToken: authState.accessToken,
        email,
      });
      const data = await res.json();
      if (res.status !== 200) {
        throw data;
      }
      setData(data.collectionUser.collection.sharedUsers);
      toast.success('Invited');
    } catch (err) {
      toast.error('Invite failed');
    }
  };
  const unshare = async (shareId: string) => {
    try {
      const res = await unshareCollectionRequest({
        collectionId,
        accessToken: authState.accessToken,
        shareId,
      });
      const data = await res.json();
      if (res.status !== 200) {
        throw data;
      }
      setData((prevData: any[]) =>
        prevData.filter(({ id }) => shareId !== id),
      );
      toast.success('Removed');
    } catch (err) {
      toast.error('Remove failed');
    }
  };
  return (
    <Modal
      className="w-[32rem] px-12 py-16 rounded-xl"
      isShow={isShow}
      closeModal={closeModal}
    >
      <div className="flex flex-col text-primary gap-4">
        <div className="flex justify-between items-center">
          <div>Share to community</div>
          <div className="flex items-center gap-1">
            <span
              className={`text-sm ${
                isPublic ? 'text-slate-400' : 'text-primary'
              }`}
            >
              Private
            </span>
            <Switch isOn={isPublic} onSwitch={switchPublic} />
            <span
              className={`text-sm ${
                isPublic ? 'text-primary' : 'text-slate-400'
              }`}
            >
              Public
            </span>
          </div>
        </div>
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (inputRef.current?.value) {
              shareToEmail(inputRef.current?.value);
            }
          }}
        >
          <input
            ref={inputRef}
            className="flex-auto p-1 text-sm border border-primary rounded"
            type="email"
          />
          <Button
            type="submit"
            className="border border-primary bg-primary text-white rounded text-sm p-1"
          >
            <span>Invite</span>
          </Button>
        </form>
      </div>
      <div className="grid grid-cols-1 flex-col gap-1 mt-3">
        {users.map(({ id, user }) => {
          return (
            <ShareInfo
              key={id}
              shareId={id}
              userEmail={user.email}
              userName={user.name}
              unshareCollection={() => unshare(id)}
            />
          );
        })}
      </div>
    </Modal>
  );
}
export default ShareModal;
