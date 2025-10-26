import { useRef } from 'react';
import Portal from '@/components/portal';
import useLayoutScroll from '@/utils/useLayoutScroll';
import useTouchOut from '@/utils/useTouchOut';

interface ModalProps {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

function Modal({ children, isOpen, onClose }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useTouchOut(modalRef, onClose);
  useLayoutScroll(isOpen);

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70">
        <dialog
          ref={modalRef}
          open={isOpen}
          className="fixed top-1/2 left-1/2 w-3/5 h-3/5 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white"
        >
          {children}
        </dialog>
      </div>
    </Portal>
  );
}

export default Modal;
