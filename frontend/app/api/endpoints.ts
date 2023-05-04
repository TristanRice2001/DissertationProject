const API_URL = "https://api.tristanrice.uk:8000";

export const REGISTER = `${API_URL}/register`;
export const ME = `${API_URL}/me`;
export const LOGIN = `${API_URL}/login`;
export const CHALLENGES = `${API_URL}/challenges`;
export const LEADERBOARD = `${API_URL}/leaderboard`;
export const START_CHALLENGE = (id: number) =>
  `${API_URL}/challenge/${id}/start`;
export const TERMINATE_CHALLENGE = (id: number) =>
  `${API_URL}/challenge/${id}/terminate`;
export const SUBMIT_FLAG = (chal_id: number) =>
  `${API_URL}/challenge/${chal_id}/complete`;
