import styled from "styled-components";

export const NavbarProfileStyled = styled.div`
  position: relative;
  .profile-dropdown-link {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;

    .profile-image {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      overflow: hidden;
      position: relative;
      border: 1px solid black;
    }
  }

  .caret {
    transition: transform 0.1s linear;
  }

  .caret-dropdown-open {
    transform: rotate(180deg);
  }

  .profile-dropdown-content {
    padding: 5px 0;
    border-radius: 5px;
    bottom: -20px;
    transform: translateY(85%);
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${(props) => props.theme.color.color2};

    .challenge-points {
      margin: 0 0 10px 0;
    }
  }
`;
