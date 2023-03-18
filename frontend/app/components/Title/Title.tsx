import { ReactNode } from "react";
import { TitleStyled } from "./TitleStyled";

interface Props {
  className?: string;
  children: ReactNode;
}

const Title = ({ className, children }: Props) => {
  return <TitleStyled className={className}>{children}</TitleStyled>;
};

export default Title;
