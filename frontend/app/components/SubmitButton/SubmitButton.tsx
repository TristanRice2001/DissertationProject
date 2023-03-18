import ButtonLoadingDots from "components/ButtonLoadingDots";
import { SubmitButtonStyled } from "./SubmitButtonStyled";

interface Props {
  value?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

const SubmitButton = ({ isDisabled, isLoading, value, className }: Props) => {
  const notLoadValue = value || "Submit";
  const btnValue = isLoading ? <ButtonLoadingDots /> : notLoadValue;

  return (
    <SubmitButtonStyled
      disabled={isDisabled}
      isLoading={isLoading}
      isDisabled={isDisabled}
      type="submit"
      className={className}
    >
      {btnValue}
    </SubmitButtonStyled>
  );
};

export default SubmitButton;
