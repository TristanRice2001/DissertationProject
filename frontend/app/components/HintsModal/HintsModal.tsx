import { CARET_LEFT_ICON, CARET_RIGHT_ICON } from "assets";
import Modal from "components/Modal";
import Image from "next/image";
import { useState } from "react";
import HintsModalStyled from "./HintsModalStyled";

interface Props {
  className?: string;
  hints: string[];
  onClose: () => void;
  isOpen?: boolean;
}

const HintsModal = ({ isOpen, className, hints, onClose }: Props) => {
  const [currentHint, setCurrentHint] = useState(0);
  const totalHintsNumber = hints.length;

  const incrementHint = () => {
    setCurrentHint((prev) => {
      if (prev >= totalHintsNumber - 1) {
        return prev;
      }
      prev++;
      return prev;
    });
  };

  const decerementHint = () => {
    setCurrentHint((prev) => {
      if (prev <= 0) {
        return prev;
      }
      prev--;
      return prev;
    });
  };

  const progressDots = Array.from({ length: totalHintsNumber }, (_, i) => (
    <div
      className={`progress-dot ${i === currentHint && "selected"}`}
      key={i}
    />
  ));

  return (
    <HintsModalStyled className={className}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <p className="hint">{hints[currentHint]}</p>

        <div className="dots">
          <button onClick={decerementHint}>
            <Image
              src={CARET_LEFT_ICON}
              width={15}
              height={15}
              alt="Caret left"
            />
          </button>
          {progressDots}
          <button onClick={incrementHint}>
            <Image
              src={CARET_RIGHT_ICON}
              width={15}
              height={15}
              alt="Caret right"
            />
          </button>
        </div>
      </Modal>
    </HintsModalStyled>
  );
};

export default HintsModal;
