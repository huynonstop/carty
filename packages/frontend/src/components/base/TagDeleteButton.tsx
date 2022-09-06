import Button from './Button';
import { IconSvg } from './Icon';

function TagDeleteButton({ onClick }: any) {
  return (
    <Button
      onClick={(e) => {
        e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();
        onClick();
      }}
      className="inline-flex items-center"
    >
      <IconSvg type="svg" className="w-4 h-4 pt-[2px]">
        <svg
          className="svg "
          width="10"
          height="10"
          viewBox="0 0 10 10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 5.71l3.646 3.647.707-.707-3.646-3.647 3.646-3.646L8.646.65 5 4.296 1.353.65l-.707.707 3.646 3.646L.646 8.65l.707.707L5 5.71z"
            fillRule="nonzero"
            fillOpacity="1"
            className="fill-primary"
            stroke="none"
          ></path>
        </svg>
      </IconSvg>
    </Button>
  );
}
export default TagDeleteButton;
