import LeaderboardItem from "components/LeaderboardItem";
import { Leaderboard as LeaderboardType } from "types/api/leaderboard";
import { LeaderboardStyled } from "./LeaderboardStyled";

interface Props {
  leaderboard: LeaderboardType;
}

const Leaderboard = ({ leaderboard }: Props) => {
  return (
    <LeaderboardStyled>
      {leaderboard.map((leaderboardPosition) => (
        <LeaderboardItem
          key={leaderboardPosition.username}
          username={leaderboardPosition.username}
          points={leaderboardPosition.points}
        />
      ))}
    </LeaderboardStyled>
  );
};

export default Leaderboard;
