import { ReactNode, useRef } from "react";

interface Props {
  isOpen?: boolean;
  children: ReactNode;
}

const Modal = ({ isOpen, children }: Props) => {
  const ref = useRef<HTMLDialogElement | null>(null);

  if (isOpen) {
    ref.current?.showModal();
  }
  return <dialog ref={ref}>{children}</dialog>;
};

export default Modal;
