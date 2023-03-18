import styled from "styled-components";

export const LoginStyled = styled.div`
  height: 100%;
  width: 100%;

  .form-item:not(:last-child) {
    margin-bottom: 10px;
  }

  .api-error {
    font-size: 14px;
    color: red;
    font-family: "Source Sans Pro", sans-serif;
    font-weight: bold;
    text-align: center;
  }
`;
