import Navbar from "components/Navbar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  hasNavBar?: boolean;
}

const PageSkeleton = ({ hasNavBar = true, children }: Props) => {
  return (
    <>
      {hasNavBar && <Navbar />}
      {children}
    </>
  );
};

export default PageSkeleton;
