import constants from "appConstants";

const {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_REGEX,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
} = constants;

export const validateUsername = (username: string) => {
  if (
    username.length < USERNAME_MIN_LENGTH ||
    username.length > USERNAME_MAX_LENGTH
  ) {
    return "Username must be between 3 and 12 characters long";
  }

  if (!username.match(USERNAME_REGEX)) {
    return "Username can only contain letters, numbers, and underscores";
  }

  return "";
};

export const validatePassword = (password: string) => {
  if (password.length < PASSWORD_MIN_LENGTH) {
    return "Password length must be greater than 8 characters";
  }

  if (!password.match(PASSWORD_REGEX)) {
    return "Password must contain one special character, one number, and one capital letter";
  }
};

export const validateSecondPassword = (
  reenterPassword: string,
  allValues?: { [key: string]: any }
) => {
  if (!allValues) return;

  if (reenterPassword !== allValues["password"]) {
    return "Passwords must match";
  }
};
