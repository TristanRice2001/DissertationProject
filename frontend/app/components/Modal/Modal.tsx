import { CROSS_ICON } from "assets";
import Image from "next/image";
import { ReactNode, useEffect, useRef } from "react";
import { ModalStyled } from "./ModalStyled";

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
    <ModalStyled ref={ref} onClose={onClose}>
      <form method="dialog">
        <button onClick={onClose} className="close-button">
          <Image src={CROSS_ICON} width={20} height={20} alt="Cross icon" />
        </button>
      </form>
      {children}
    </ModalStyled>
  );
};

export default Modal;
