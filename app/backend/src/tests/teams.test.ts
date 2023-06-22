import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import teamsMock from './mock/teams.mock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Sucess Case', () => {    
  beforeEach(sinon.restore);

  it('bring all teams whith sucess', async () => {
    // Arrange
    const AllTeams = teamsMock.teams.map((team) => SequelizeTeam.build(team));

    sinon.stub(SequelizeTeam, 'findAll').resolves(AllTeams);

    // Act
    const { status, body } = await chai.request(app).get('/teams');
        
    // Assert
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(teamsMock.teams);
  });

  it('bring one team whith sucess', async () => {
    // Arrange
    const id = 1;
    const team = SequelizeTeam.build(teamsMock.byIdTeam);

    sinon.stub(SequelizeTeam, 'findByPk').resolves(team);

    // Act
    const { status, body } = await chai.request(app).get(`/teams/${id}`);
        
    // Assert
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(teamsMock.byIdTeam);
  });

});
