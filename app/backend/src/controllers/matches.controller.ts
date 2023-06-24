import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

class MatchesController {
  constructor(private matchesService = new MatchesService()) {
  }

  public findAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress) {
      return res.status(200)
        .json(((await this.matchesService
          .findMatchStatus(inProgress === 'true'))
          .data));
    }
    const { data } = await this.matchesService.findAllMatches();
    return res.status(200).json(data);
  };
}

export default MatchesController;
