import styled from "styled-components";

const RegisterStyled = styled.div`
  height: 100%;
  background: ${(props) => props.theme.color.color1};
  display: grid;
  place-items: center;

  .register-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background: ${(props) => props.theme.color.color2};
  }

  .form-item {
    display: flex;
    flex-direction: column;
  }

  .input-label {
  }
`;

export default RegisterStyled;
