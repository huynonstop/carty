import classNames from '@/utils/classNames';
import { PropsWithChildren } from 'react';

interface TagProps {
  className?: string;
}

function Tag({ className, ...props }: PropsWithChildren<TagProps>) {
  return (
    <span
      className={classNames([
        'inline-flex items-center',
        className || '',
      ])}
      onClick={(e) => e.stopPropagation()}
      {...props}
    />
  );
}
export default Tag;
