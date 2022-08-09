import cartyLogoUrl from '@/assets/carty-logo.png';
import Button from '@/components/base/Button';
import { flexColXYCenter } from '@/utils/tailwind';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <>
      <div className={flexColXYCenter}>
        <img
          src={cartyLogoUrl}
          style={{
            width: '256px',
            height: '256px',
            mixBlendMode: 'luminosity',
          }}
        />
        <h1 className="text-white text-semibold text-[4rem]">Carty</h1>
      </div>
      <Button className="bg-white rounded">
        <Link to="/auth" className="inline-flex items-center px-4 h-12">
          <span className="text-lg font-semibold text-primary flex-initial">
            Let's prepare your shopping
          </span>
        </Link>
      </Button>
    </>
  );
}

export default HomePage;
