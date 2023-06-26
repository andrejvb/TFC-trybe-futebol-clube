import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

class MatchesController {
  constructor(private matchesService = new MatchesService()) {
  }

  public findAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress === 'true') {
      const inProgressMatch = await this.matchesService.findMatchStatus(true);
      return res.status(200).json(inProgressMatch.data);
    }
    if (inProgress === 'false') {
      const inProgressMatch = await this.matchesService.findMatchStatus(false);
      return res.status(200).json(inProgressMatch.data);
    }
    const { data } = await this.matchesService.findAllMatches();
    return res.status(200).json(data);
  };
}

export default MatchesController;
