import Challenge from "components/Challenge";
import { Challenge as ChallengeType } from "types/challenge";
import DashboardStlyed from "./DashboardStyled";

interface Props {
  challenges: ChallengeType[];
}

const Dashboard = ({ challenges }: Props) => {
  return (
    <DashboardStlyed>
      <div className="challenge-container">
        {challenges.map((chal) => (
          <Challenge key={chal.id} challenge={chal} />
        ))}
      </div>
    </DashboardStlyed>
  );
};

export default Dashboard;
