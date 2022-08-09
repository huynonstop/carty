import classNames from '@/utils/classNames';
import { useDelayShow } from '@/utils/hooks/useDelayShow';
import { flexColXYCenter, flexXYCenter } from '@/utils/tailwind';
import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import Backdrop from './Backdrop';

interface ModalProps {
  isShow: boolean;
  onCloseModal: () => void;
}

function Modal({
  isShow,
  children,
  onCloseModal,
}: PropsWithChildren<ModalProps>) {
  const [isDelayShow] = useDelayShow(isShow, 300);
  const animationClass = isShow
    ? 'index-show-animation'
    : 'index-hide-animation';
  return createPortal(
    <>
      <Backdrop
        className={classNames([animationClass, 'z-10'])}
        isShow={isDelayShow}
        onClick={onCloseModal}
      />
      <dialog
        className={classNames([
          animationClass,
          'z-20 bg-white rounded',
          'fixed w-fit border m-auto transition-all',
          'top-1/2 -translate-y-1/2',
        ])}
        open={isDelayShow}
      >
        {children}
      </dialog>
    </>,
    document.getElementById('root-modal')!,
  );
}
export default Modal;
