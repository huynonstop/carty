import { useState } from 'react';
import { toast } from 'react-toastify';
import Icon from './Icon';

interface EditRowProps {
  className?: string;
  valueClassName?: string;
  value?: string | number;
  setValue?: (value: any) => Promise<any>;
  canEdit: boolean;
}
function EditRowState({
  className = '',
  valueClassName = '',
  value,
  setValue,
  canEdit,
}: EditRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);
  return isEditing ? (
    <form
      className="flex border border-primary rounded gap-1 p-1"
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
      <input
        className="outline-none"
        autoFocus
        value={editValue}
        onChange={(e) => {
          setEditValue(e.target.value);
        }}
      />
      {!isLoading && (
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
      )}
    </form>
  ) : (
    <div className="group gap-1 ">
      <span className={valueClassName}>{value}</span>
      {canEdit && (
        <Icon
          className="hidden group-hover:inline-flex cursor-pointer"
          type="edit"
          onClick={() => {
            setIsEditing(true);
          }}
        />
      )}
    </div>
  );
}
export default EditRowState;
