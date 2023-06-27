import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import leaderBoard from './mock/leaderBoard.mock';
import SequelizeMatch from '../database/models/SequelizeMatch';


chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Sucess Case', () => {    
    
    beforeEach(sinon.restore);
    
  it('Get leaderBoard whith sucess', async () => {
    // Arrange
    // sinon.stub(SequelizeMatch, 'findAll').resolves(leaderBoard.leaderMock as any);
    // Act
    const { status, body } = await chai.request(app).get('/leaderboard/home')
    // Assert
    expect(status).to.be.equal(200);
    // expect(body).to.be.deep.equal(leaderBoard.leaderMock)
    expect(body[0]).to.have.deep.property('name', 'Santos');
    expect(body[0]).to.have.own.property('name');
    expect(body[0]).to.have.own.property('totalPoints');
    expect(body[0]).to.have.own.property('totalGames');
    expect(body[0]).to.have.own.property('totalVictories');
    expect(body[0]).to.have.own.property('totalLosses');
    expect(body[0]).to.have.own.property('goalsFavor');
    expect(body[0]).to.have.own.property('goalsOwn');
    expect(body[0]).to.have.own.property('goalsBalance');
    expect(body[0]).to.have.own.property('efficiency');

  });
});
