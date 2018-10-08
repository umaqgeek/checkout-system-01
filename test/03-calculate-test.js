'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
const expect = require("chai").expect;

chai.use(chaiHttp);

// testing and expected data.
let postData = [
  {
    customer: '',
    skus: [],
    expected: {
      total: '0.00',
      status: 200
    }
  },
  {
    customer: 'default',
    skus: ['classic', 'standout', 'premium'],
    expected: {
      total: '987.97',
      status: 200
    }
  },
  {
    customer: 'Unilever',
    skus: ['classic', 'classic', 'classic', 'premium'],
    expected: {
      total: '934.97',
      status: 200
    }
  },
  {
    customer: 'Apple',
    skus: ['standout', 'standout', 'standout', 'premium'],
    expected: {
      total: '1294.96',
      status: 200
    }
  },
  {
    customer: 'Nike',
    skus: ['premium', 'premium', 'premium', 'premium'],
    expected: {
      total: '1519.96',
      status: 200
    }
  }
];

// start testing.
describe('/POST calculate', () => {
  postData.forEach(function (data) {

    it('it should able to POST data `' + data.customer + '` to calculate and return total $' + data.expected.total, (done) => {

      chai.request(server).post('/calculate').send({
        customer: data.customer,
        skus: data.skus
      }).end((err, res) => {

        expect(res.body.total).equal(data.expected.total);

        done();
      });
    });
  });
});
