import { flexXYCenter } from '@/utils/tailwind';
import cartyLogoUrl from '@/assets/carty-logo.png';
import { useNavigate } from 'react-router-dom';
import classNames from '@/utils/classNames';

function Logo({ text }: { text: string }) {
  const navigate = useNavigate();
  return (
    <div
      className={classNames([flexXYCenter, 'h-8 gap-2 px-2'])}
      onClick={() => navigate('/')}
    >
      <img
        src={cartyLogoUrl}
        alt="logo"
        style={{ width: '32px', height: '32px' }}
      />

      <span className="text-primary text-lg">{text}</span>
    </div>
  );
}
export default Logo;
