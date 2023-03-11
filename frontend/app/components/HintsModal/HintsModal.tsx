import Modal from "components/Modal";
import HintsModalStyled from "./HintsModalStyled";

interface Props {
  className?: string;
  hints: string[];
  onClose: () => void;
  isOpen?: boolean;
}

const HintsModal = ({ isOpen, className, hints, onClose }: Props) => {
  return (
    <HintsModalStyled className={className}>
      <Modal isOpen={isOpen} onClose={onClose}>
        {hints}
        <form method="dialog">
          <button onClick={onClose}>Close</button>
        </form>
      </Modal>
    </HintsModalStyled>
  );
};

export default HintsModal;
