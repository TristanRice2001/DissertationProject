import styled from "styled-components";

export const ModalStyled = styled.dialog`
  margin: auto;
  padding: 15px;
  position: relative;
  border-radius: 5px;
  border: none;

  .close-button {
    background: none;
    border: none;
    top: 10px;
    cursor: pointer;
    margin-left: auto;
    display: block;
    right: 10px;
  }
`;
