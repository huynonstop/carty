import {
  ComponentType,
  FunctionComponent,
  PropsWithChildren,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import Icon from './Icon';

interface EditGroupProps {
  label: string;
  className?: string;
  valueClassName?: string;
  value?: string | number | any;
  setValue?: (value: any) => Promise<any>;
  inputElement: (state: {
    editValue: any;
    setEditValue: any;
  }) => JSX.Element;
  canEdit: boolean;
}
function EditGroupState({
  label,
  className = '',
  value,
  children,
  inputElement,
  setValue,
  canEdit,
}: PropsWithChildren<EditGroupProps>) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <form
      className={className}
      onSubmit={async (e) => {
        if (!setValue) return;
        e.preventDefault();
        setIsLoading(true);
        try {
          await setValue(editValue);
          toast.success('Edited');
          setIsEditing(false);
        } catch (err) {
          console.log(err);
          toast.error('Edit error');
        } finally {
          setIsLoading(false);
        }
      }}
    >
      <div className="flex items-center gap-1 group">
        <label>
          <strong>{label}</strong>
        </label>
        <div className="flex items-center gap-1">
          {isEditing ? (
            <>
              <Icon
                type="x"
                className="transition h-6 w-6 rounded hover:bg-slate-200 cursor-pointer"
                onClick={() => {
                  setIsEditing(false);
                  setEditValue(value);
                }}
              />
              <button type="submit">
                <Icon
                  type="check"
                  className="transition p-1 h-6 w-6 rounded hover:bg-green-200 cursor-pointer"
                />
              </button>
            </>
          ) : (
            canEdit && (
              <Icon
                className="hidden group-hover:flex cursor-pointer"
                type="edit"
                onClick={() => {
                  setIsEditing(true);
                }}
              />
            )
          )}
        </div>
      </div>
      {isEditing
        ? inputElement({ editValue, setEditValue })
        : children}
    </form>
  );
}
export default EditGroupState;
