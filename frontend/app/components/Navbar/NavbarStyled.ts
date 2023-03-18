import styled from "styled-components";

const NavbarStyled = styled.div`
  height: 88px;
  background: #d9d9d9;
  display: flex;
  align-items: center;
  padding: 20px;
  justify-content: space-between;

  .logo {
    font-size: 20px;
  }

  .nav-links {
    display: flex;
    gap: 15px;
  }

  .nav-link {
    color: black;
    text-decoration: none;
  }

  .overlay {
    display: none;
  }

  @media only screen and (max-width: 500px) {
    padding: 20px;

    .hamburger-menu-open {
      height: 25px;
    }

    .cross-icon {
      display: flex;
      margin-bottom: 20px;
    }

    .nav-links {
      display: none;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      flex-direction: column;
      background: #d9d9d9;
      z-index: 3;
      padding: 20px;
    }

    .nav-links.mobile-nav-open {
      display: flex;
    }

    .overlay {
      position: fixed;
      inset: 0;
      z-index: 2;
      overflow: hidden;
      display: block;
      background: grey;
      opacity: 0.2;
    }
  }
`;

export default NavbarStyled;
