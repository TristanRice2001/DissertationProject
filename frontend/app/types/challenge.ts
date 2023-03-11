export type ChallengeStatus = "active" | "inactive";

export interface Challenge {
  id: number;
  points: number;
  name: string;
  status: ChallengeStatus;
  completed: boolean;
  ip?: string | null;
  secondsAvailable?: number | null;
  secondsLeft?: number | null;
  hints: string[];
}
