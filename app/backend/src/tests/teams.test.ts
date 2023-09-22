import * as sinon from 'sinon';
import * as chai from 'chai';
//@ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import TeamModel from '../models/TeamModel';
import { teamsMock, teamCruzeiroMock } from './mocks/teams.mock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  let findStub: sinon.SinonStub;

  before(() => {
    findStub = sinon.stub(TeamModel, 'findAll');
    findStub.resolves(teamsMock);
  });

  after(() => {
    findStub.restore();
  });

  it('Deve retornar a lista de times', async () => {
    const response = await chai.request(app).get('/api/teams');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(teamsMock);
  });

  it('Deve retornar dados de um time específico por ID', async () => {
    
    sinon.stub(TeamModel, 'findById').resolves(teamCruzeiroMock);

    const response = await chai.request(app).get('/api/teams/5');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(teamCruzeiroMock);
  });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
