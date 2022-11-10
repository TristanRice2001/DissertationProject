export type ChallengeStatus = "active" | "inactive";

export interface Challenge {
  id: number;
  points: number;
  name: string;
  status: ChallengeStatus;
  ip?: string | null;
  totalSecondsAvailavble?: number | null;
  secondsLeftForChallenge?: number | null;
  hints: string[];
}
