import { FormEvent, useEffect, useState } from "react";
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
import SubmitButton from "components/SubmitButton/SubmitButton";

interface Props {
  apiResponse?: AuthResponse;
}

const Register = ({}: Props) => {
  const [reenterPasswordError, setReenterPasswordError] = useState("");

  const { handleSubmit, apiError, isLoading } = useAuth();

  const validators = {
    username: validateUsername,
    password: validatePassword,
    reenterPassword: validateSecondPassword,
  };
  const { values, errors, handleChange, areValuesMissing, doErrorsExist } =
    useForm<RegisterForm>(
      {
        username: "",
        password: "",
        reenterPassword: "",
      },
      validators
    );

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    handleSubmit({
      valuesType: "register",
      values,
    });
  };

  useEffect(() => {
    const { reenterPassword, password } = values;

    if (password === "" || reenterPassword === "") {
      setReenterPasswordError("");
      return;
    }

    if (reenterPassword !== password) {
      setReenterPasswordError("Passwords must match");
    } else {
      setReenterPasswordError("");
    }
  }, [values.reenterPassword, values.password]);

  return (
    <RegisterStyled>
      <AuthScreen
        title="Register"
        className="auth-screen"
        handleSubmit={onSubmit}
      >
        <FormItem
          name="username"
          className="form-item"
          type="text"
          onChange={handleChange}
          id="username-input"
          value={values.username}
          label="Username"
          error={errors.username}
        />
        <FormItem
          name="password"
          className="form-item"
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
          className="form-item"
          onChange={handleChange}
          error={errors.reenterPassword || reenterPasswordError}
          id="reenter-password-input"
          value={values.reenterPassword}
          label="Re-enter password"
        />
        {apiError && apiError !== "" && <p className="api-error">{apiError}</p>}
        <SubmitButton
          value="Register"
          isLoading={isLoading}
          isDisabled={
            areValuesMissing || doErrorsExist || !!reenterPasswordError
          }
          className="submit-button"
        />
        <a href="/login" className="login-link">
          Already have an account? Login
        </a>
      </AuthScreen>
    </RegisterStyled>
  );
};

export default Register;
