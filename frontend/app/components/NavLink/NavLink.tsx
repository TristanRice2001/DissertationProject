import { ReactNode } from "react";
import { NavLinkStyled } from "./NavLinkStyled";

interface Props {
  href: string;
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

const NavLink = ({ href, children, className, ...props }: Props) => {
  return (
    <NavLinkStyled href={href} className={className} {...props}>
      {children}
    </NavLinkStyled>
  );
};

export default NavLink;
