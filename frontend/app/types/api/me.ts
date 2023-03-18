import { User } from "types/user";

export type MeResponse = {
  success: boolean;
  message: string;
  user: User;
};
