import Button from '@/components/base/Button';
import classNames from '@/utils/classNames';
import { contentContainer, flexXYCenter } from '@/utils/tailwind';
import { Link } from 'react-router-dom';

function AboutPage() {
  return (
    <>
      <div
        className={classNames([
          'flex flex-col',
          'gap-8 py-8',
          contentContainer,
        ])}
      >
        <h3>
          Carty is an application that make your shopping life easier
          and better.
        </h3>
        <div>
          <p>Main features:</p>
          <ul>
            <li>Create and manage shopping lists</li>
            <li>
              Explore other’s shopping list with intersting shopping
              guide
            </li>
            <li>
              Share your shopping list with friend and community
            </li>
          </ul>
        </div>

        <div className={flexXYCenter}>
          <Button type="button">
            <Link
              className={classNames([
                'bg-primary rounded text-white h-9 px-4 py-2',
                'transition-transform hover:translate-y-1',
              ])}
              to={-1 as any}
            >
              Back
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
export default AboutPage;
