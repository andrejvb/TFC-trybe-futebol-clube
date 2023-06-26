import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

class MatchesController {
  constructor(private matchesService = new MatchesService()) {
  }

  public findAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress === 'true') {
      const { data } = await this.matchesService.findMatchStatus(true);
      return res.status(200).json(data);
    }
    if (inProgress === 'false') {
      const { data } = await this.matchesService.findMatchStatus(false);
      return res.status(200).json(data);
    }
    const { data } = await this.matchesService.findAllMatches();
    return res.status(200).json(data);
  };

  public finishMath = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { data } = await this.matchesService.finishMath(Number(id));
    return res.status(200).json(data);
  };
}

export default MatchesController;