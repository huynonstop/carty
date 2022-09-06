import { WithClassName } from '@/utils/hoc/WithClassName';
import './Switch.css';

const Switch = ({
  className = '',
  isOn,
  onSwitch,
}: {
  className?: string;
  isOn: boolean;
  onSwitch: () => void;
}) => {
  return (
    <WithClassName
      as="label"
      className={['switch', className, 'relative']}
    >
      <input
        checked={isOn}
        className="invisible w-0 h-0"
        type="checkbox"
        onChange={(e) => {
          e.preventDefault();
          onSwitch();
        }}
      />
      <span className="slider"></span>
    </WithClassName>
  );
};
export default Switch;
