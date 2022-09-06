import { ComponentType, useState } from 'react';
import { WithClassName } from './WithClassName';

interface HOCProps<T> {
  className?: string;
  value: T | null;
}

export function withEdit<T>(
  DisplayComponent: ComponentType<any>,
  InputComponent: ComponentType<any>,
) {
  return ({ className = '', value }: HOCProps<T>) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState<T | null>(value);
    return (
      <WithClassName as="div" className={className}>
        {isEditing ? (
          <DisplayComponent
            value={editValue}
            setIsEditing={setIsEditing}
          />
        ) : (
          <InputComponent
            value={editValue}
            setEditValue={setEditValue}
            setIsEditing={setIsEditing}
          />
        )}
      </WithClassName>
    );
  };
}
