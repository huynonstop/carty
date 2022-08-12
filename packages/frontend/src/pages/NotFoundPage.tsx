import Button from '@/components/base/Button';
import classNames from '@/utils/classNames';
import { flexColXYCenter, flexXYCenter } from '@/utils/tailwind';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <>
      <div
        className={classNames([
          'w-full rounded text-white gap-4',
          flexColXYCenter,
        ])}
      >
        <h2 className="text-7xl">Not Found</h2>
        <h4 className="text-5xl">$)$</h4>
        <Button className="bg-white rounded">
          <Link
            to={-1 as any}
            className="inline-flex items-center px-4 h-12"
          >
            <span className="text-lg font-semibold text-primary flex-initial">
              Back to where it began
            </span>
          </Link>
        </Button>
      </div>
    </>
  );
}
export default NotFoundPage;
