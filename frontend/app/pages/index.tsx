import { getChallenges } from "api/getChallenges";
import PageSkeleton from "components/PageSkeleton/PageSkeleton";
import { Challenge } from "types/challenge";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Dashboard from "../containers/Dashboard";
import constants from "appConstants";
import { me } from "api/me";
import { useChallenges } from "hooks/useChallenges";
import { useEffect } from "react";

interface Props {
  challenges: Challenge[];
}

const { AUTH_TOKEN_COOKIE_NAME } = constants;

export default function Home({ challenges }: Props) {
  const { setChallenges } = useChallenges();

  useEffect(() => {
    setChallenges(challenges);
  }, []);

  return (
    <PageSkeleton>
      <Dashboard />
    </PageSkeleton>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const registerRedirectObj = {
    redirect: {
      permenant: false,
      destination: "/register",
    },
    props: {},
  };

  const authCookie = context.req.cookies[AUTH_TOKEN_COOKIE_NAME];

  if (!authCookie) return registerRedirectObj;

  let meData;

  try {
    meData = await me(authCookie);
  } catch (e) {
    return registerRedirectObj;
  }

  if (!meData?.data.success) return registerRedirectObj;

  const challenges = await getChallenges(authCookie);

  return {
    props: {
      challenges: challenges.data,
    },
  };
};
