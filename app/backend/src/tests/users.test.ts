import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import teamsMock from './mock/teams.mock';
import usersMock from './mock/users.mock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Sucess Case', () => {    
    
    beforeEach(sinon.restore);
    
  it('login whith sucess', async () => {
    // Arrange
    const validUser = usersMock.validLogin

    // Act
    const { status, body } = await chai.request(app).post('/login').send(validUser);
    // Assert
    expect(status).to.be.equal(200);
    expect(body).to.have.own.property('token')

  });

  it('Validation user whith sucess', async () => {
    // Arrange

    // Act
    const { status, body } = await chai.
    request(app)
    .get('/login/role')
    .set('Authorization', usersMock.token)
        
    // Assert
    expect(status).to.be.equal(200);
    expect(body).to.have.own.property('role')
    expect(body).to.have.deep.property('role', 'admin');
  });
});
