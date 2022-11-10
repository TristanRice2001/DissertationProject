import axios from "axios";

export const authenticatedRequest = (jwtToken: string) =>
  axios.create({
    headers: {
      Authorization: jwtToken,
    },
  });
