import PageSkeleton from "components/PageSkeleton/PageSkeleton";
import RegisterContainer from "containers/Register/Register";

export default function Register() {
  return (
    <PageSkeleton hasNavBar={false}>
      <RegisterContainer />
    </PageSkeleton>
  );
}
