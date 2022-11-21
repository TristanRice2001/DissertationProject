import constants from "appConstants";
import { getCookie } from "./cookie";

export const convertSecondsToReadableTimeFormat = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds / 60) % 60);
  const secondsLeft = seconds % 60;
  return `${hours}:${minutes}:${secondsLeft}`;
};

export const getJwtToken = () => {
  const authTokenCookieName = constants["AUTH_TOKEN_COOKIE_NAME"];
  return getCookie(authTokenCookieName);
};
