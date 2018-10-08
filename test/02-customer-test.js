'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
const expect = require("chai").expect;

chai.use(chaiHttp);

describe('/GET customers', () => {
  it('it should GET all the customers priviledge status', (done) => {

    chai.request(server).get('/customers').end((err, res) => {

      expect(res.body).to.be.a('array');
      expect(res.body[0]).to.be.a('object');
      expect(res.body).not.equal(0);
      expect(res).to.have.status(200);

      done();
    });
  });
});
