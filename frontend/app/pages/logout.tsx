import constants from "appConstants";
import cookie from "cookie";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

const Logout = () => {
  return <div>Logged out...</div>;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  context.res.setHeader(
    "Set-Cookie",
    cookie.serialize(constants["AUTH_TOKEN_COOKIE_NAME"], "", {
      maxAge: -1,
    })
  );
  return {
    redirect: {
      permanent: false,
      destination: "/register",
    },
    props: {},
  };
};

export default Logout;
