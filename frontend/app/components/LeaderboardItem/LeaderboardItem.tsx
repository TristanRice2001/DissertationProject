import { LeaderboardItemStyled } from "./LeaderboardItemStyled";

interface Props {
  username: string;
  leaderboardIndex: number;
  points: number;
}

const LeaderboardItem = ({ username, leaderboardIndex, points }: Props) => {
  return (
    <LeaderboardItemStyled>
      <div className="username">
        <span className="index">{leaderboardIndex}.</span> {username}
      </div>
      <div className="points">
        {points}
        <span className="ptsLetters">pts</span>
      </div>
    </LeaderboardItemStyled>
  );
};

export default LeaderboardItem;
