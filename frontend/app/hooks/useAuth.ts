import { login } from "api/login";
import { register } from "api/register";
import { setCookie } from "helpers/cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { LoginForm } from "types/forms/login";
import { RegisterForm } from "types/forms/register";
import constants from "appConstants";

type SubmitProps =
  | {
      valuesType: "login";
      values: LoginForm;
    }
  | {
      valuesType: "register";
      values: RegisterForm;
    };

const { AUTH_TOKEN_COOKIE_NAME } = constants;

export const useAuth = () => {
  const genericApiError = "There was a problem registering your user";
  const router = useRouter();
  const [apiError, setApiError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async ({ valuesType, values }: SubmitProps) => {
    let response;
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      if (valuesType === "login") response = await login(values);
      else response = await register(values);
    } catch {
      setApiError(genericApiError);
      setIsLoading(false);
      return;
    }

    if (!response?.data.success) {
      setIsLoading(false);
      const errorMessage = response?.data.message || genericApiError;
      setApiError(errorMessage);
      return;
    }
    console.log("here");
    setCookie(AUTH_TOKEN_COOKIE_NAME, response.data.token);
    router.push("/");
  };

  return {
    handleSubmit,
    isLoading,
    apiError,
  };
};
