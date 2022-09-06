import { useAuthContext } from '@/features/auth/auth.context';
import { setUserName } from '@/features/user/user.api';
import classNames from '@/utils/classNames';
import { flexXYCenter } from '@/utils/tailwind';
import { PropsWithChildren, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../base/Button';

interface UserNameEditorProps {
  nameValue: string;
  className?: string;
  setNameValue: (newName: string) => void;
  canEdit: boolean;
}
function UserNameEditor({
  nameValue,
  className,
  setNameValue,
  canEdit,
}: PropsWithChildren<UserNameEditorProps>) {
  const { authState } = useAuthContext();
  const [isEditMode, setEditMode] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const onEdit = () => {
    setEditMode(true);
  };
  const onCancel = () => {
    setEditMode(false);
  };
  const onSave = async () => {
    if (nameInputRef.current && nameInputRef.current.value) {
      try {
        console.log(nameInputRef.current.value);
        const res = await setUserName({
          accessToken: authState.accessToken,
          name: nameInputRef.current.value,
        });
        const data = await res.json();
        if (res.status !== 200) {
          console.log(data);
          throw new Error('CANNOT_SET');
        }
        setNameValue(data.name);
        toast.success('Username set');
        setEditMode(false);
      } catch (err) {
        console.log(err);
        toast.error('Cannot set username');
      }
    }
  };
  return (
    <div className={className || ''}>
      {isEditMode ? (
        <>
          <input
            ref={nameInputRef}
            className="h-full px-4 border rounded outline-primary"
            placeholder="New name"
            name="name"
            type="name"
            required
          />
          <Button
            type="submit"
            className={classNames([
              'bg-white border-2 border-primary rounded text-primary h-9',
              'px-4',
            ])}
            onClick={onCancel}
          >
            <strong>Cancel</strong>
          </Button>
          <Button
            type="submit"
            className={classNames([
              'bg-primary border-2 border-primary  rounded text-white h-9',
              'px-4',
            ])}
            onClick={onSave}
          >
            Save
          </Button>
        </>
      ) : (
        <>
          <h4>{nameValue || 'Name is not set'}</h4>
          {canEdit && (
            <Button
              type="button"
              className={classNames([
                'bg-primary border-2 border-primary  rounded text-white h-9',
                'px-4',
              ])}
              onClick={onEdit}
            >
              Edit
            </Button>
          )}
        </>
      )}
    </div>
  );
}
export default UserNameEditor;
