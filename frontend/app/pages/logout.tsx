import constants from "appConstants";
import cookie from "cookie";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

const Logout = () => {
  return <div>Logged out...</div>;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // If the user visits the /logout URL, then deregister their
  // Auth token cookie, and redirect them to the login page
  context.res.setHeader(
    "Set-Cookie",
    cookie.serialize(constants["AUTH_TOKEN_COOKIE_NAME"], "", {
      maxAge: -1,
    })
  );
  return {
    redirect: {
      permanent: false,
      destination: "/login",
    },
    props: {},
  };
};

export default Logout;
