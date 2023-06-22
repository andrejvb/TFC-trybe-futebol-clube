import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

class TeamsController {
//   private teamService: IteamService

  //   constructor(teamService: IteamService) {
  //     this.teamService = teamService;
  //   }

  constructor(private teamService = new TeamsService()) {
  }

  public findAllTeams = async (req: Request, res: Response) => {
    const { data } = await this.teamService.findAllTeams();
    return res.status(200).json(data);
  };

  public findTeamById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { data } = await this.teamService.findTeamById(id);
    return res.status(200).json(data);
  };
}

export default TeamsController;
