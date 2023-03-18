import globalDefaults from "./globals.json";

export default {
  AUTH_TOKEN_COOKIE_NAME: "auth-token",
  USERNAME_REGEX: /^[\w\d_]*$/,
  PASSWORD_REGEX: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
  GENERIC_API_ERROR: "There was a problem with our api",
  ...globalDefaults,
};
