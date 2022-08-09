import classNames from '@/utils/classNames';
import { flexXYCenter } from '@/utils/tailwind';

function Spinner() {
  return (
    <div
      className={classNames([
        flexXYCenter,
        'rounded transition-opacity w-full h-full',
      ])}
    >
      <i className="index-spinner" />
    </div>
  );
}

export default Spinner;
