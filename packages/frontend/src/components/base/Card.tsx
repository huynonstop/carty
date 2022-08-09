import classNames from '@/utils/classNames';
import { PropsWithChildren } from 'react';

interface CardProps {
  className?: string;
  onClick?: () => void;
}
function Card({
  className,
  children,
  ...props
}: PropsWithChildren<CardProps>) {
  return (
    <div
      {...props}
      className={classNames([className || '', 'border rounded'])}
    >
      {children}
    </div>
  );
}
export default Card;
