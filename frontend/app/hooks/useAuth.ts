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
  // generic API error if we don't know the error
  const genericApiError = "There was a problem registering your user";
  const router = useRouter();
  //apiError state variable
  const [apiError, setApiError] = useState<string>("");
  // isLoading state variable for the authentication from
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async ({ valuesType, values }: SubmitProps) => {
    // this function should be triggered once the submit formn is loadfed
    let response;
    if (isLoading) {
      // If the form is currently loading, then don't do anything
      return;
    }

    // Before anything is done, then set the form to loading
    setIsLoading(true);
    try {
      // If this is a login form, then send the request to the login api
      if (valuesType === "login") response = await login(values);
      // Otherwise, send the request to the register API
      else response = await register(values);
    } catch {
      // If there is an error, just set the error to a generic error
      setApiError(genericApiError);
      setIsLoading(false);
      return;
    }

    if (!response?.data.success) {
      // If the API didn't respond successfully, then just
      // set the error to the message sent by the API
      setIsLoading(false);
      const errorMessage = response?.data.message || genericApiError;
      setApiError(errorMessage);
      return;
    }
    // Set the cookie to the token the backend API responded with
    setCookie(AUTH_TOKEN_COOKIE_NAME, response.data.token);
    // Redirect the user to the dashboard page
    router.push("/");
  };

  return {
    handleSubmit,
    isLoading,
    apiError,
  };
};
