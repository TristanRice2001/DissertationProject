import { ReactNode } from "react";
import { DesktopContentStyled } from "./DesktopContentStyled";

interface Props {
  children: ReactNode;
}

const DesktopContent = ({ children }: Props) => {
  return <DesktopContentStyled>{children}</DesktopContentStyled>;
};

export default DesktopContent;
