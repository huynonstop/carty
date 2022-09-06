import Button from '@/components/base/Button';
import MoreCollectionSidebar from '@/components/collection/MoreCollectionSidebar';
import UserNameEditor from '@/components/user/UserNameEditor';
import NameEdit from '@/components/user/UserNameEditor';
import { useAuthContext } from '@/features/auth/auth.context';
import { getUserInfoById } from '@/features/user/user.api';
import classNames from '@/utils/classNames';
import { flexColXYCenter, flexXYCenter } from '@/utils/tailwind';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function UserPage() {
  const [userInfo, setUserInfo] = useState<{
    email: string;
    name: string;
    isUser: boolean;
  } | null>(null);
  const { authState, dispatchLogout } = useAuthContext();
  const params = useParams();
  const navigate = useNavigate();
  const userId = params.userId;
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!userId) {
        navigate(`/user/${authState.userId}`, {
          replace: true,
        });
        return;
      }
      try {
        const res = await getUserInfoById({
          accessToken: authState.accessToken,
          userId,
        });
        const data = await res.json();
        if (res.status !== 200) {
          throw new Error('CANNOT_GET_USER_INFO');
        }
        setUserInfo({
          email: data.email,
          name: data.name,
          isUser: data.isUser,
        });
      } catch (err: any) {
        console.log(err.message);
        setUserInfo(null);
        toast.error('Failed to fetch user');
      }
    };
    fetchUserInfo();
  }, [userId]);
  const logoutClick = () => {
    dispatchLogout();
    navigate('/', {
      replace: true,
    });
  };
  return (
    <>
      <div className="flex flex-col flex-auto gap-4 border-l">
        <div className="flex flex-col shadow-card p-6 gap-4">
          <h3>
            <strong>User profile</strong>
          </h3>
          {userInfo ? (
            <div className="flex flex-col gap-4">
              <UserNameEditor
                canEdit={userInfo && userInfo.isUser}
                className="inline-flex items-center gap-4"
                nameValue={userInfo.name}
                setNameValue={(newName: string) =>
                  setUserInfo({
                    ...userInfo,
                    name: newName,
                  })
                }
              />
              <h3 className="text-blue-500">{userInfo.email}</h3>
            </div>
          ) : (
            <div>Not found user info</div>
          )}
          {userId && (
            <MoreCollectionSidebar
              onDelete={async () => {}}
              isOwner={false}
              ownerId={userId}
            />
          )}
          {userInfo && userInfo.isUser && (
            <Button
              type="button"
              className={classNames([
                'border border-primary bg-white rounded text-primary h-9 px-4 py-2 max-w-[25%]',
                'transition-transform hover:translate-y-1',
                flexXYCenter,
              ])}
              onClick={logoutClick}
            >
              <p>Logout</p>
            </Button>
          )}
        </div>
        {userInfo && userInfo.isUser && (
          <div
            className={classNames([
              'flex flex-col flex-auto p-4 gap-4',
            ])}
          >
            <Link to="/about">
              <h3>More about Carty</h3>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
export default UserPage;
