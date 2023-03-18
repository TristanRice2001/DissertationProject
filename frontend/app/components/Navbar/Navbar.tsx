import { useState } from "react";
import NavbarStyled from "./NavbarStyled";
import Link from "next/link";
import NavLink from "components/NavLink/NavLink";
import MobileContent from "components/MobileContent";
import Image from "next/image";
import { CROSS_ICON, HAMBURGER_ICON } from "assets";
import { useUser } from "hooks/useUser";
import NavbarProfile from "components/NavbarProfile/NavbarProfile";

const Navbar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { isAuthenticated, user } = useUser();

  type NavbarLink = {
    content: string;
    href: string;
    requiresAuthentication?: boolean;
    requiresNoAuthentication?: boolean;
  };

  const navbarLinks: NavbarLink[] = [
    {
      content: "Dashboard",
      href: "/",
      requiresAuthentication: true,
    },
    {
      content: "Leaderboard",
      href: "/leaderboard",
    },
    {
      content: "Register",
      href: "/register",
      requiresNoAuthentication: true,
    },
    {
      content: "Login",
      href: "/login",
      requiresNoAuthentication: true,
    },
  ];

  const makeLink = (link: NavbarLink) => {
    if (
      (isAuthenticated && link.requiresNoAuthentication) ||
      (!isAuthenticated && link.requiresAuthentication)
    ) {
      return null;
    }
    return (
      <NavLink key={link.content} href={link.href}>
        {link.content}
      </NavLink>
    );
  };

  const openNav = () => {
    setIsMobileNavOpen(true);
    document.documentElement.style.overflow = "hidden";
  };

  const closeNav = () => {
    setIsMobileNavOpen(false);
    document.documentElement.style.overflow = "auto";
  };
  return (
    <NavbarStyled>
      <MobileContent>
        <div className="hamburger-menu-open">
          <Image
            onClick={openNav}
            src={HAMBURGER_ICON}
            width={30}
            height={30}
            alt="Hamburger icon"
          />
        </div>
      </MobileContent>
      <Link href="/" className="logo nav-link">
        Hackability
      </Link>
      <div className={`nav-links ${isMobileNavOpen && "mobile-nav-open"}`}>
        <MobileContent>
          <div className="cross-icon" onClick={closeNav}>
            <Image src={CROSS_ICON} width={20} height={20} alt="cross icon" />
          </div>
        </MobileContent>
        {navbarLinks.map(makeLink)}
        {isAuthenticated && user && user.username && (
          <NavbarProfile
            username={user.username}
            profilePicture={
              "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
            }
          />
        )}
      </div>
      {isMobileNavOpen && <div onClick={closeNav} className="overlay"></div>}
    </NavbarStyled>
  );
};

export default Navbar;
