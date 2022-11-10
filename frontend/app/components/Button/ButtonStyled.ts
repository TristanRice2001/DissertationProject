import styled from "styled-components";
import { Variant } from "./types";

interface Props {
  isDisabled?: boolean;
  variant: Variant;
}

const variantColors = {
  start: "#45DD54",
  stop: "#E52727",
  reset: "#FAFF00",
  hint: "#30D5EC",
};

const ButtonStyled = styled.button<Props>`
  cursor: ${(props) => (props.isDisabled ? "auto" : "pointer")};
  background: ${(props) => variantColors[props.variant]};
  color: black;
  outline: none;
  border: none;
  padding: 5px 15px;
  font-size: 14px;
  display: grid;
  border-radius: 8px;
  place-items: center;
  ${(props) => props.isDisabled && `opacity: 0.6`};
`;

export default ButtonStyled;
