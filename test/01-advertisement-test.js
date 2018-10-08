'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
const expect = require('chai').expect;

chai.use(chaiHttp);

// testing and expected data.
let testData = [
  {
    query: {
      id: 'classic'
    },
    expected: {
      body: {
        id: 'classic',
        name: 'Classic Ad',
        normalPrice: 269.99,
        description: 'Offers the most basic level of advertisement.',
        priority: 1,
        options: {}
      },
      status: 200
    }
  },
  {
    query: {
      id: 'standout'
    },
    expected: {
      body: {
        id: 'standout',
        name: 'Standout Ad',
        normalPrice: 322.99,
        description: 'Allows advertisers to use a company logo and use a longer'+
          ' presentation text.',
        priority: 2,
        options: {
          applePrice: 299.99,
          fordPrice: 309.99
        }
      },
      status: 200
    }
  },
  {
    query: {
      id: 'premium'
    },
    expected: {
      body: {
        id: 'premium',
        name: 'Premium Ad',
        normalPrice: 394.99,
        description: 'Same benefits as Standout Ad, but also puts the '+
          'advertisement at the top of the results, allowing higher visibility.',
        priority: 3,
        options: {
          nikePrice: 379.99,
          fordPrice: 389.99
        }
      },
      status: 200
    }
  }
];

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

  testData.forEach(function (data) {

    it('it should GET advertisement of `'+data.query.id+'`', (done) => {

      chai.request(server).get('/advertisements?id='+data.query.id).end((err, res) => {

        expect(res.body).to.be.a('array');
        expect(res.body[0]).to.be.a('object');
        expect(res.body).not.equal(0);
        expect(res).to.have.status(data.expected.status);
        expect(res.body[0].id).equal(data.expected.body.id);
        expect(res.body[0].name).equal(data.expected.body.name);
        expect(res.body[0].normalPrice).equal(data.expected.body.normalPrice);
        expect(res.body[0].description).equal(data.expected.body.description);
        expect(res.body[0].priority).equal(data.expected.body.priority);
        expect(res.body[0].options).to.be.a('object');

        done();
      });
    });
  });
});
