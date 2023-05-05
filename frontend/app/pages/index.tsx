import { getChallenges } from "api/getChallenges";
import PageSkeleton from "components/PageSkeleton/PageSkeleton";
import { Challenge } from "types/challenge";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Dashboard from "../containers/Dashboard";
import constants from "appConstants";
import { me } from "api/me";
import { useChallenges } from "hooks/useChallenges";
import { useEffect } from "react";
import { FilterContextProvider } from "context/FilterContext";
import { User } from "types/user";
import { useUser } from "hooks/useUser";

interface Props {
  challenges: Challenge[];
  user: User;
}

const { AUTH_TOKEN_COOKIE_NAME } = constants;

export default function Home({ challenges, user }: Props) {
  const { setChallenges } = useChallenges();
  const { setCurrentUser, setIsAuthenticated } = useUser();

  // Set challenges globally for the user of the application
  useEffect(() => {
    setCurrentUser(user);
    setChallenges(challenges);
  }, []);

  return (
    <PageSkeleton>
      <FilterContextProvider>
        <Dashboard />
      </FilterContextProvider>
    </PageSkeleton>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // Object to return if we need to redirect the user
  const loginRedirectObj = {
    redirect: {
      permenant: false,
      destination: "/login",
    },
    props: {},
  };
  // Get authentication cookie from user's cookies they sent
  const authCookie = context.req.cookies[AUTH_TOKEN_COOKIE_NAME];
  // If authentication cookie is not present, redirect the user to the login page
  if (!authCookie) return loginRedirectObj;
  let meData;
  try {
    // Send a request to the '/me' API
    meData = await me(authCookie);
  } catch (e) {
    // If the API request fails, then redirect the user to the login page
    return loginRedirectObj;
  }

  // If the API request is not successful, then redirect the user again
  if (!meData?.data.success || !meData.data.user) return loginRedirectObj;
  // Retrieve the challenges from the API using the authcookie we just got
  const challenges = await getChallenges(authCookie);
  return {
    props: {
      challenges: challenges.data,
      user: meData.data.user,
    },
  };
};
