import ButtonStyled from "./ButtonStyled";
import { Variant } from "./types";

interface Props {
  variant: Variant;
  isDisabled?: boolean;
}

const Button = ({ variant, isDisabled }: Props) => {
  const buttonText = {
    start: "Start",
    stop: "Stop",
    reset: "Reset",
    hint: "Hint",
  };
  return (
    <ButtonStyled
      variant={variant}
      isDisabled={isDisabled}
      disabled={isDisabled}
    >
      {buttonText[variant]}
    </ButtonStyled>
  );
};

export default Button;
