import { ReactNode } from "react";
import { MobileContentStyled } from "./MobileContentStyled";

interface Props {
  children: ReactNode;
}

const MobileContent = ({ children }: Props) => {
  return <MobileContentStyled>{children}</MobileContentStyled>;
};

export default MobileContent;
