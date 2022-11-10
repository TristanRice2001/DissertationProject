import styled from "styled-components";

const AuthScreenStyled = styled.div`
  height: 100%;
  width: 100%;
  background: ${(props) => props.theme.color.color1};
  display: grid;
  place-items: center;

  form,
  .auth-box {
    width: min(90%, 350px);
  }

  .auth-box {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: ${(props) => props.theme.color.color2};
    padding: 30px;
    border-radius: 10px;
  }

  .title {
    font-family: ${(props) => props.theme.fonts.primary};
    color: ${(props) => props.theme.color.color5};
  }
`;

export default AuthScreenStyled;
