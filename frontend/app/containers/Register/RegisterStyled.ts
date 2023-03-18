import styled from "styled-components";

const RegisterStyled = styled.div`
  height: 100%;

  && {
    .auth-box {
      gap: 0;
    }
  }

  .form-item:not(:last-child) {
    margin-bottom: 10px;
  }

  .api-error {
    font-size: 14px;
    color: red;
    font-family: "Source Sans Pro", sans-serif;
    font-weight: bold;
    margin: 0 auto;
  }

  .login-link {
    font-size: 12px;
    margin-top: 10px;
  }
`;

export default RegisterStyled;
