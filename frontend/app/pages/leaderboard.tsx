import { getChallenges } from "api/getChallenges";
import PageSkeleton from "components/PageSkeleton/PageSkeleton";
import { GetServerSidePropsContext } from "next";
import LeaderboardContainer from "containers/Leaderboard";
import { Leaderboard as LeaderboardType } from "types/api/leaderboard";
import { getLeaderboard } from "api/getLeaderboard";

interface Props {
  leaderboard: LeaderboardType;
  error?: string;
}

export default function Leaderboard({ leaderboard }: Props) {
  return (
    <PageSkeleton>
      <LeaderboardContainer leaderboard={leaderboard} />
    </PageSkeleton>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  let leaderboard;
  try {
    leaderboard = await getLeaderboard();
  } catch (e) {
    return {
      props: {
        error: "There was an error getting the leaderboard",
        leaderboard: [],
      },
    };
  }

  return {
    props: {
      leaderboard: leaderboard.data || [],
    },
  };
};
