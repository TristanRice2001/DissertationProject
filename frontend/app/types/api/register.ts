export type RegisterResponse = {
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
