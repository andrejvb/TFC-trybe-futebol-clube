import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import matchesMock from './mock/matches.mock';
import usersMock from './mock/users.mock';
import SequelizeMatch from '../database/models/SequelizeMatch';


chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Sucess Case', () => {    
    
    beforeEach(sinon.restore);
    
  it('Get all matches whith sucess', async () => {
    // Arrange
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesMock.allMatches as any);
    // Act
    const { status, body } = await chai.request(app).get('/matches')
    // Assert
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(matchesMock.allMatches)

  });

  it('Finish match whith sucess', async () => {
    // Arrange
    
    // Act
    const { status, body } = await chai.
    request(app)
    .patch('/matches/1/finish')
    .set('Authorization', usersMock.token)
        
    // Assert
    expect(status).to.be.equal(200);
    expect(body).to.have.deep.property('message', 'Finished');
  });

  it('Update match whith sucess', async () => {
    // Arrange
    const bodyUpdate = {
        "homeTeamGoals": 3,
        "awayTeamGoals": 1
      }
    // Act
    const { status, body } = await chai.
    request(app)
    .patch('/matches/1')
    .set('Authorization', usersMock.token)
    .send(bodyUpdate)
        
    // Assert
    expect(status).to.be.equal(200);
    expect(body).to.have.deep.property('message', 'Update finished');
  });

  it('Create match whith sucess', async () => {
    // Arrange
    const bodyUpdate = {
        "homeTeamId": 16, // O valor deve ser o id do time
        "awayTeamId": 8, // O valor deve ser o id do time
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      }
    // Act
    const { status, body } = await chai.
    request(app)
    .post('/matches')
    .set('Authorization', usersMock.token)
    .send(bodyUpdate)
        
    // Assert
    expect(status).to.be.equal(201);
    expect(body).to.have.own.property('id');
    expect(body).to.have.own.property('homeTeamId');
    expect(body).to.have.own.property('homeTeamGoals');
    expect(body).to.have.own.property('awayTeamId');
    expect(body).to.have.own.property('awayTeamGoals');
    expect(body).to.have.deep.property('inProgress', true);
  });
});
