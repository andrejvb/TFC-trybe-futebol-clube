export interface ILeaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number,
  efficiency: number,
}

export type ILeaderboardHomeResponse = {
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalLosses: number,
  totalDraws: number,
  goalsFavor: number,
  goalsOwn: number,
  homeTeam: {
    teamName: string
  }
};

export type ILeaderboardAwayResponse = {
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalLosses: number,
  totalDraws: number,
  goalsFavor: number,
  goalsOwn: number,
  awayTeam: {
    teamName: string
  }
};

export type ILeaderResponse = ILeaderboardHomeResponse | ILeaderboardAwayResponse;
