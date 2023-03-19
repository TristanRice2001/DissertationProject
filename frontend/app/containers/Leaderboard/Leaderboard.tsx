import LeaderboardItem from "components/LeaderboardItem";
import Title from "components/Title/Title";
import { useUser } from "hooks/useUser";
import { Leaderboard as LeaderboardType } from "types/api/leaderboard";
import { LeaderboardStyled } from "./LeaderboardStyled";

interface Props {
  leaderboard: LeaderboardType;
}

const Leaderboard = ({ leaderboard }: Props) => {
  const { isAuthenticated } = useUser();
  const top10Leaderboard = leaderboard.leaderboardTop10;
  const userPositionContext = leaderboard.currentUserPosition;
  const getUserPosition = (index: number, userPosition: number) => {
    return index + userPosition + (userPosition === 0 ? 1 : -1);
  };
  return (
    <LeaderboardStyled>
      <Title className="title">Leaderboard</Title>
      {top10Leaderboard?.map((leaderboardPosition, index) => (
        <LeaderboardItem
          leaderboardIndex={index + 1}
          key={leaderboardPosition.username}
          username={leaderboardPosition.username}
          points={leaderboardPosition.points}
        />
      ))}
      {userPositionContext && <Title className="title">Your position</Title>}
      {isAuthenticated &&
        userPositionContext &&
        userPositionContext.context.map((userContext, index) => (
          <LeaderboardItem
            leaderboardIndex={getUserPosition(
              index,
              userPositionContext.position
            )}
            key={index}
            username={userContext.username}
            points={userContext.points}
          />
        ))}
    </LeaderboardStyled>
  );
};

export default Leaderboard;
