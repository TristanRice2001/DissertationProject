export type LeaderboardItem = {
  username: string;
  points: number;
};

export type Leaderboard = {
  currentUserPosition: {
    context: LeaderboardItem[];
    position: number;
  };
  leaderboardTop10: LeaderboardItem[];
};
