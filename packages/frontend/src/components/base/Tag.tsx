import classNames from '@/utils/classNames';
import { CSSProperties, PropsWithChildren } from 'react';

interface TagProps {
  className?: string;
  style?: CSSProperties;
}

function Tag({
  className,
  style,
  ...props
}: PropsWithChildren<TagProps>) {
  return (
    <span
      style={style}
      className={classNames([
        'inline-flex items-center',
        className || 'rounded bg-slate-200 px-2',
      ])}
      onClick={(e) => e.stopPropagation()}
      {...props}
    />
  );
}
export default Tag;
