const API_URL = "http://127.0.0.1:5000";

export const REGISTER = `${API_URL}/register`;
export const ME = `${API_URL}/me`;
export const LOGIN = `${API_URL}/login`;
export const CHALLENGES = `${API_URL}/challenges`;
export const START_CHALLENGE = (id: number) =>
  `${API_URL}/challenge/${id}/start`;
export const TERMINATE_CHALLENGE = (id: number) =>
  `${API_URL}/challenge/${id}/terminate`;
