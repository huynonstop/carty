import classNames from '@/utils/classNames';
import { WithClassName } from '@/utils/hoc/WithClassName';
import { flexXYCenter } from '@/utils/tailwind';

function Spinner({
  className = '',
  spinnerClassName = '',
}: {
  className?: string;
  spinnerClassName?: string;
}) {
  return (
    <WithClassName
      className={[
        className,
        flexXYCenter,
        'rounded transition-opacity w-full h-full',
      ]}
    >
      <WithClassName
        as="i"
        className={['index-spinner', spinnerClassName]}
      />
    </WithClassName>
  );
}

export default Spinner;
