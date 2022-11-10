import { FormEvent, ReactNode } from "react";
import AuthScreenStyled from "./AuthScreenStyled";

interface Props {
  handleSubmit: (e: FormEvent) => any;
  title: string;
  children: ReactNode;
  className?: string;
}

const AuthScreen = ({ handleSubmit, title, children, className }: Props) => {
  return (
    <AuthScreenStyled className={className}>
      <form action="" onSubmit={handleSubmit}>
        <div className="auth-box">
          <h1 className="title">{title}</h1>
          {children}
        </div>
      </form>
    </AuthScreenStyled>
  );
};

export default AuthScreen;
