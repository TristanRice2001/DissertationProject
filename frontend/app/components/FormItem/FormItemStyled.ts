import styled from "styled-components";

interface Props {
  hasError?: boolean;
}

const FormItemStyled = styled.div<Props>`
  display: flex;
  flex-direction: column;

  .error {
    font-size: 10px;
    color: red;
    font-family: "Source Sans Pro", sans-serif;
    font-weight: 600;
    margin-left: 3px;
  }

  .input-label {
    font-family: ${(props) => props.theme.fonts.primary};
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 4px;
    color: ${(props) => props.theme.color.color5};
  }

  .input-box {
    border-radius: 5px;
    background: #d9d9d9;
    appearance: none;
    padding: 6px 9px;
    outline: none;

    border: ${(props) => (props.hasError ? "solid 2px red" : "none")};
  }

  input:-internal-autofill-selected {
    background-color: #d9d9d9 !important;
  }
`;

export default FormItemStyled;
