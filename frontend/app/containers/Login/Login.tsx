import { LoginStyled } from "./LoginStyled";
import { FormEvent } from "react";
import { AuthResponse } from "types/api/auth";
import AuthScreen from "components/AuthScreen";
import FormItem from "components/FormItem/FormItem";
import { useForm } from "hooks/useForm";
import { useAuth } from "hooks/useAuth";
import { LoginForm } from "types/forms/login";
import SubmitButton from "components/SubmitButton/SubmitButton";

interface Props {
  apiResponse?: AuthResponse;
}

const Register = ({}: Props) => {
  const { values, handleChange, areValuesMissing } = useForm<LoginForm>({
    username: "",
    password: "",
  });

  const { handleSubmit, isLoading, apiError } = useAuth();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    handleSubmit({
      valuesType: "login",
      values,
    });
  };

  return (
    <LoginStyled>
      <AuthScreen title="Login" handleSubmit={onSubmit}>
        <FormItem
          name="username"
          type="text"
          onChange={handleChange}
          className="form-item"
          id="username-input"
          value={values.username}
          label="Username"
        />
        <FormItem
          name="password"
          type="password"
          className="form-item"
          onChange={handleChange}
          id="password-input"
          value={values.password}
          label="Password"
        />
        {apiError && apiError !== "" && <p className="api-error">{apiError}</p>}
        <SubmitButton
          isLoading={isLoading}
          isDisabled={areValuesMissing}
          className="submit-button"
        />
        <a href="/register">Don't have an account yet? Sign up</a>
      </AuthScreen>
    </LoginStyled>
  );
};

export default Register;
