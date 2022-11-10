import ActionButtonStyled from "./ActionButtonStyled";
import { Variant } from "./types";

interface Props {
  variant: Variant;
  isDisabled?: boolean;
}

const ActionButton = ({ variant, isDisabled }: Props) => {
  const buttonText = {
    start: "Start",
    stop: "Stop",
    reset: "Reset",
    hint: "Hint",
  };
  return (
    <ActionButtonStyled
      variant={variant}
      isDisabled={isDisabled}
      disabled={isDisabled}
    >
      {buttonText[variant]}
    </ActionButtonStyled>
  );
};

export default ActionButton;
