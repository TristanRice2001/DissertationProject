import { ReactNode, useEffect, useRef } from "react";

interface Props {
  isOpen?: boolean;
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose, children }: Props) => {
  const ref = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
    }
  }, [isOpen]);

  return (
    <dialog ref={ref} onClose={onClose}>
      {children}
    </dialog>
  );
};

export default Modal;
