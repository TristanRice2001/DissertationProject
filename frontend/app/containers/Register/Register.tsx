import { FormEvent } from "react";
import { AuthResponse } from "types/api/auth";
import RegisterStyled from "./RegisterStyled";
import AuthScreen from "components/AuthScreen";
import { RegisterForm } from "types/forms/register";
import {
  validatePassword,
  validateSecondPassword,
  validateUsername,
} from "validators";
import FormItem from "components/FormItem/FormItem";
import { useForm } from "hooks/useForm";
import { useAuth } from "hooks/useAuth";

interface Props {
  apiResponse?: AuthResponse;
}

const Register = ({}: Props) => {
  const validators = {
    username: validateUsername,
    password: validatePassword,
    reenterPassword: validateSecondPassword,
  };
  const { values, errors, handleChange } = useForm<RegisterForm>(
    {
      username: "",
      password: "",
      reenterPassword: "",
    },
    validators
  );

  const { handleSubmit, apiError } = useAuth();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    handleSubmit({
      valuesType: "register",
      values,
    });
  };

  return (
    <RegisterStyled>
      <AuthScreen title="Register" handleSubmit={onSubmit}>
        <FormItem
          name="username"
          type="text"
          onChange={handleChange}
          id="username-input"
          value={values.username}
          label="Username"
          error={errors.username}
        />
        <FormItem
          name="password"
          type="password"
          onChange={handleChange}
          id="password-input"
          value={values.password}
          error={errors.password}
          label="Password"
        />
        <FormItem
          name="reenterPassword"
          type="password"
          onChange={handleChange}
          error={errors.reenterPassword}
          id="reenter-password-input"
          value={values.reenterPassword}
          label="Re-enter password"
        />
        <input type="submit" />
        {apiError && apiError !== "" && <p>{apiError}</p>}
      </AuthScreen>
    </RegisterStyled>
  );
};

export default Register;
