import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderboard.service';

export default class LeaderBoardController {
  constructor(private leaderBoardService = new LeaderBoardService()) {
  }

  public getLeaderBoardHome = async (req: Request, res: Response) => {
    const data = await this.leaderBoardService.finalBalanceHome();
    return res.status(200).json(data);
  };

  public getLeaderBoardAway = async (req: Request, res: Response) => {
    const data = await this.leaderBoardService.finalBalanceAway();
    return res.status(200).json(data);
  };
}
