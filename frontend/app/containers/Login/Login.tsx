import { LoginStyled } from "./LoginStyled";
import { FormEvent } from "react";
import { AuthResponse } from "types/api/auth";
import AuthScreen from "components/AuthScreen";
import { RegisterForm } from "types/forms/register";
import FormItem from "components/FormItem/FormItem";
import { useForm } from "hooks/useForm";
import { useAuth } from "hooks/useAuth";
import { LoginForm } from "types/forms/login";

interface Props {
  apiResponse?: AuthResponse;
}

const Register = ({}: Props) => {
  const { values, handleChange } = useForm<LoginForm>({
    username: "",
    password: "",
  });

  const { handleSubmit, apiError } = useAuth();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    handleSubmit({
      valuesType: "login",
      values,
    });
  };

  return (
    <LoginStyled>
      <AuthScreen title="Register" handleSubmit={onSubmit}>
        <FormItem
          name="username"
          type="text"
          onChange={handleChange}
          id="username-input"
          value={values.username}
          label="Username"
        />
        <FormItem
          name="password"
          type="password"
          onChange={handleChange}
          id="password-input"
          value={values.password}
          label="Password"
        />
        <input type="submit" />
        {apiError && apiError !== "" && <p>{apiError}</p>}
      </AuthScreen>
    </LoginStyled>
  );
};

export default Register;
