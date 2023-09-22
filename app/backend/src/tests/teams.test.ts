import * as sinon from 'sinon';
import * as chai from 'chai';
//@ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import TeamModel from '../models/TeamModel'; 
import { teamsMock } from './mocks/teams.mock'; 

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  let findStub: sinon.SinonStub;

  before(() => {
    
    findStub = sinon.stub(TeamModel, 'findAll');
    
    findStub.resolves(teamsMock);
  });

  after(() => {
    // Restaure o stub após o teste
    findStub.restore();
  });

  it('Deve retornar a lista de times', async () => {
    const response = await chai.request(app).get('/api/teams');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(teamsMock);
  });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
