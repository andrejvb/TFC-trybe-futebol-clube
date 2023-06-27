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

  public updateMath = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { data } = await this
      .matchesService
      .updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(200).json(data);
  };

  createMatch = async (req: Request, res: Response) => {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;

    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const { data, status } = await this
      .matchesService
      .createMatch({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals });
    if (status === 'NOT_FOUND') return res.status(404).json(data);
    return res.status(201).json(data);
  };
}

export default MatchesController;
