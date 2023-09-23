import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import { app } from "../app";
import SequelizeUser from "../database/models/SequelizeUser";
import JWT from "../utils/JWT";
const jwt = require("jsonwebtoken");
import Validations from "../middlewares/Validations";
import {
  mockUser2,
  mockToken,
  mockValidLogin,
  mockInvalidEmailLogin,
} from "./UserMock";

import * as bcrypt from "bcryptjs";

chai.use(chaiHttp);

const { expect } = chai;

describe("Teste do LOGIN endpoint", () => {
  afterEach(sinon.restore);
  it("Retorna um token de acesso e status 200 para um login com sucesso", async function () {
    sinon.stub(SequelizeUser, "findOne").resolves(mockUser2 as any);
    sinon.stub(bcrypt, "compareSync").returns(true);
    sinon.stub(JWT, "sign").returns(mockToken);
    sinon.stub(Validations, "validateLogin").returns();

    const httpResponse = await chai
      .request(app)
      .post("/login")
      .send(mockValidLogin);

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.have.key("token");
    expect(httpResponse.body).to.deep.equal({ token: mockToken });
  });

  it("Retorna status 401 para um login com email inválido", async function () {
    const invalidEmailLogin = { ...mockValidLogin, ...mockInvalidEmailLogin };

    sinon.stub(SequelizeUser, "findOne").resolves(null);

    const res = await chai.request(app).post("/login").send(invalidEmailLogin);

    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal("Invalid email or password");
  });

  it("Retorna status 401 para um login com senha inválida", async function () {
    sinon.stub(SequelizeUser, "findOne").resolves(mockUser2 as any);
    sinon.stub(bcrypt, "compareSync").returns(false);

    const res = await chai.request(app).post("/login").send(mockValidLogin);

    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal("Invalid email or password");
  });

  it("Retorna status 401 quando o token não é fornecido", async function () {
    const httpResponse = await chai.request(app).get("/login/role");

    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body.message).to.equal("Token not found");
  });

  it("Retorna status 401 quando o token não contém a role", async function () {
    sinon.stub(JWT, "verify").returns({ email: "user@example.com" });

    const httpResponse = await chai
      .request(app)
      .get("/login/role")
      .set("authorization", "Bearer fake-token");

    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body.message).to.equal(
      "Token does not contain user role"
    );
  });
});
