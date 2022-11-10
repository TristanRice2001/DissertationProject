import styled from "styled-components";

const FormItemStyled = styled.div`
  display: flex;
  flex-direction: column;

  .input-label {
    font-family: ${(props) => props.theme.fonts.primary};
    font-weight: bold;
    color: ${(props) => props.theme.color.color5};
  }
`;

export default FormItemStyled;
