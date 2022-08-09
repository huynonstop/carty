import classNames from '@/utils/classNames';

function SectionDiv({ className }: { className?: string }) {
  return (
    <div
      className={classNames(['h-px bg-slate-200', className || ''])}
    />
  );
}
export default SectionDiv;
