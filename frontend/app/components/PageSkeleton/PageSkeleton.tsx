import Navbar from "components/Navbar";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title?: string;
  hasNavBar?: boolean;
}

const PageSkeleton = ({ title, hasNavBar = true, children }: Props) => {
  const pageTitle = title || "Hackability";
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {hasNavBar && <Navbar />}
      {children}
      <ToastContainer position="bottom-center" pauseOnFocusLoss={false} />
    </>
  );
};

export default PageSkeleton;
