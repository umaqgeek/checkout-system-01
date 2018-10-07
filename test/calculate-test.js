'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
const expect = require("chai").expect;

chai.use(chaiHttp);

let postData = [{
  customer: '',
  skus: [],
  expected: {
    result: 'Customer: Default\nSKUs scanned: \nTotal expected: $0.00',
    status: 200
  },
  customer: 'default',
  skus: ['classic', 'standout', 'premium'],
  expected: {
    result: 'Customer: Default\nSKUs scanned: `Classic`, `Standout`, `Premium`\nTotal expected: $987.97',
    status: 200
  },
  customer: 'Unilever',
  skus: ['classic', 'classic', 'classic', 'premium'],
  expected: {
    result: 'Customer: Unilever\nSKUs scanned: `Classic`, `Classic`, `Classic`, `Premium`\nTotal expected: $934.97',
    status: 200
  },
  customer: 'Apple',
  skus: ['standout', 'standout', 'standout', 'premium'],
  expected: {
    result: 'Customer: Apple\nSKUs scanned: `Standout`, `Standout`, `Standout`, `Premium`\nTotal expected: $1294.96',
    status: 200
  },
  customer: 'Nike',
  skus: ['premium', 'premium', 'premium', 'premium'],
  expected: {
    result: 'Customer: Nike\nSKUs scanned: `Premium`, `Premium`, `Premium`, `Premium`\nTotal expected: $1519.96',
    status: 200
  }
}];

describe('/POST calculate', () => {
  postData.forEach(function (data) {

    it('it should able to POST data ' + data.customer + ' to calculate and return result', (done) => {

      chai.request(server).post('/calculate').send({
        customer: data.customer,
        skus: data.skus
      }).end((err, res) => {

        expect(res.text).to.be.a('string');
        expect(res.text).equal(data.expected.result);
        expect(res).to.have.status(data.expected.status);

        done();
      });

    });

  });
});
