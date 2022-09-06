import {
  ComponentType,
  HTMLAttributes,
  PropsWithChildren,
} from 'react';
import classNames from '../classNames';

interface WithClassNameProps
  extends Omit<HTMLAttributes<HTMLOrSVGElement>, 'className'> {
  className?: string | string[];
  as?: keyof JSX.IntrinsicElements | any;
}
export const WithClassName = ({
  className = '',
  as = 'div',
  children,
  ...props
}: PropsWithChildren<WithClassNameProps & any>) => {
  const Element = as;
  const elementClassName = Array.isArray(className)
    ? classNames(className)
    : className;
  return (
    <Element className={elementClassName} {...props}>
      {children}
    </Element>
  );
};

interface HOCProps {
  className?: string | string[];
}

export function withClassName(Component: ComponentType<any>) {
  return ({ className, ...compProps }: any) => {
    const elementClassName = Array.isArray(className)
      ? classNames(className)
      : className;
    return <Component className={elementClassName} {...compProps} />;
  };
}
