import Iteams from '../../Interfaces/Iteams';

const teams: Iteams[] = [
  {id: 1, teamName: 'Corinthians'}, 
  { id: 2, teamName: 'Vasco' },
];

const teamList = teams.map((t) => ({ dataValues: t }))

const byIdTeam = teams[0];

const returnModel = teamList[0];

export default { teams, byIdTeam, returnModel}