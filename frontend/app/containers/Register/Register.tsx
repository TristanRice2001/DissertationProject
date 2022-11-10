import { register } from "api/register";
import { ChangeEvent, FormEvent } from "react";
import Challenge from "components/Challenge";
import { useState } from "react";
import { RegisterResponse } from "types/api/register";
import { Challenge as ChallengeType } from "types/challenge";
import { useRouter } from "next/router";
import { setCookie } from "helpers/cookie";
import RegisterStyled from "./RegisterStyled";
import { AUTH_TOKEN_COOKIE_NAME } from "appConstants";

interface Props {
  apiResponse?: RegisterResponse;
}

const Register = ({}: Props) => {
  const genericApiError = "Ther was a problem registering your user";
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [apiError, setApiError] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { username, password } = formData;
    let response;

    try {
      response = await register(username, password);
    } catch {
      setApiError(genericApiError);
    }

    if (!response?.data.success) {
      const errorMessage = response?.data.message || genericApiError;
      setApiError(errorMessage);
      return;
    }

    setCookie(AUTH_TOKEN_COOKIE_NAME, response.data.token);
    router.push("/");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  console.log(formData);
  return (
    <RegisterStyled>
      <form method="POST" action="" onSubmit={handleSubmit}>
        <div className="register-box">
          <h1 className="title">Login</h1>
          <div className="form-item">
            <label htmlFor="username-input">Username</label>
            <input
              id="username-input"
              type="text"
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="form-item">
            <label htmlFor="password-input">Password</label>
            <input
              id="password-input"
              type="text"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="form-item">
            <label htmlFor="reenter-password-input">Re-enter password</label>
            <input
              id="reenter-password-input"
              type="password"
              name="reenter-password"
              onChange={handleChange}
            />
          </div>
          <input type="submit" />
          {apiError && apiError !== "" && <p>{apiError}</p>}
        </div>
      </form>
    </RegisterStyled>
  );
};

export default Register;
