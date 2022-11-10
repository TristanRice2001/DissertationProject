export type AuthResponse = {
  message: string;
} & (
  | {
      success: true;
      token: string;
    }
  | {
      success: false;
      token: never;
    }
);
