import ActionButtonStyled from "./ActionButtonStyled";
import { Variant } from "./types";

interface Props {
  variant: Variant;
  onClick?: () => void;
  isDisabled?: boolean;
}

const ActionButton = ({ variant, isDisabled, onClick }: Props) => {
  const buttonText = {
    start: "Start",
    stop: "Stop",
    reset: "Reset",
    hint: "Hint",
    submit: "Submit Flag",
  };
  return (
    <ActionButtonStyled
      variant={variant}
      isDisabled={isDisabled}
      disabled={isDisabled}
      onClick={onClick}
    >
      {buttonText[variant]}
    </ActionButtonStyled>
  );
};

export default ActionButton;
