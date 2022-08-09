import classNames from '@/utils/classNames';
import { PropsWithChildren } from 'react';

interface ButtonProps {
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

function Button({
  children,
  className,
  type,
  ...otherProps
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={classNames([className || '', 'cursor-pointer'])}
      type={type || 'button'}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default Button;
