import { WithClassName } from '@/utils/hoc/WithClassName';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

interface UserLinkProps {
  userId: string;
  name: string;
  email: string;
  className?: string;
  userClassName?: string;
  isUser?: boolean;
}
function UserLink({
  className = '',
  userClassName = '',
  name,
  email,
  userId,
  children,
  isUser = false,
}: PropsWithChildren<UserLinkProps>) {
  return (
    <WithClassName
      className={className}
      as={Link}
      to={`/user/${userId}`}
    >
      {children}
      <span className={userClassName}>
        {isUser ? 'you' : name || email}
      </span>
    </WithClassName>
  );
}
export default UserLink;
