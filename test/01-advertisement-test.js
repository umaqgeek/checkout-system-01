'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
const expect = require("chai").expect;

chai.use(chaiHttp);

describe('/GET advertisements', () => {
  it('it should GET all the advertisements', (done) => {

    chai.request(server).get('/advertisements').end((err, res) => {

      expect(res.body).to.be.a('array');
      expect(res.body[0]).to.be.a('object');
      expect(res.body).not.equal(0);
      expect(res).to.have.status(200);

      done();
    });

  });
});
