'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();

chai.use(chaiHttp);

describe('/GET advertisements', () => {
  it('it should GET all the advertisements', (done) => {

    chai.request(server).get('/advertisements').end((err, res) => {

      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.length.should.not.eql(0);
      done();

    });

  });
});
