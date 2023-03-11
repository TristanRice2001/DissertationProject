import { LeaderboardItemStyled } from "./LeaderboardItemStyled";

interface Props {
  username: string;
  points: number;
}

const LeaderboardItem = ({ username, points }: Props) => {
  return (
    <LeaderboardItemStyled>
      <div className="username">{username}</div>
      <div className="points">{points}</div>
    </LeaderboardItemStyled>
  );
};

export default LeaderboardItem;
