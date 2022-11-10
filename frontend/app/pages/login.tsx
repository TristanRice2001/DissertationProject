import PageSkeleton from "components/PageSkeleton/PageSkeleton";
import LoginContainer from "containers/Login/Login";

export default function Register() {
  return (
    <PageSkeleton hasNavBar={false}>
      <LoginContainer />
    </PageSkeleton>
  );
}
