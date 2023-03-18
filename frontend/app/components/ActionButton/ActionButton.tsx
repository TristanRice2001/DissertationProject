import ButtonLoadingDots from "components/ButtonLoadingDots";
import ActionButtonStyled from "./ActionButtonStyled";
import { Variant } from "./types";
import MobileContent from "components/MobileContent";
import DesktopContent from "components/DesktopContent/DesktopContent";
import {
  SQUARE_ICON,
  FLAG_ICON,
  QUESTION_MARK_ICON,
  PLAY_BUTTON_ICON,
} from "assets";
import Image from "next/image";

interface Props {
  variant: Variant;
  onClick?: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  isIcon?: boolean;
}

const ActionButton = ({
  variant,
  isIcon,
  isDisabled,
  isLoading,
  onClick,
}: Props) => {
  const buttonText = {
    start: "Start",
    stop: "Stop",
    reset: "Reset",
    hint: "Hint",
    submit: "Submit Flag",
  };

  const buttonIcon = {
    start: PLAY_BUTTON_ICON,
    stop: SQUARE_ICON,
    hint: QUESTION_MARK_ICON,
    submit: FLAG_ICON,
    reset: FLAG_ICON,
  };

  const iconContent = isLoading ? (
    <ButtonLoadingDots />
  ) : (
    <Image
      src={buttonIcon[variant]}
      width={10}
      height={10}
      alt={buttonText[variant]}
    />
  );

  const textContent = isLoading ? <ButtonLoadingDots /> : buttonText[variant];
  return (
    <ActionButtonStyled
      variant={variant}
      isDisabled={isDisabled || isLoading}
      disabled={isDisabled || isLoading}
      onClick={onClick}
    >
      <MobileContent>{iconContent}</MobileContent>
      <DesktopContent>{isIcon ? iconContent : textContent}</DesktopContent>
    </ActionButtonStyled>
  );
};

export default ActionButton;
