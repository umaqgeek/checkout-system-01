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
      id: 'default'
    },
    expected: {
      body: {
        id: 'default',
        description: [],
        priority: 1
      },
      status: 200
    }
  },
  {
    query: {
      id: 'unilever'
    },
    expected: {
      body: {
        id: 'unilever',
        description: [
            'Gets a <strong>“3 for 2” deal on Classic Ads</strong>.'
        ],
        priority: 2
      },
      status: 200
    }
  },
  {
    query: {
      id: 'apple'
    },
    expected: {
      body: {
        id: 'apple',
        description: [
            'Gets a discount on <strong>Standout Ads where the price drops '+
              'to $299.99 per ad</strong>.'
        ],
        priority: 3
      },
      status: 200
    }
  },
  {
    query: {
      id: 'nike'
    },
    expected: {
      body: {
        id: 'nike',
        description: [
            'Gets a discount on <strong>Premium Ads where 4 or more</strong> '+
              'are purchased. The price drops to <strong>$379.99 per ad</strong>.'
        ],
        priority: 4
      },
      status: 200
    }
  },
  {
    query: {
      id: 'ford'
    },
    expected: {
      body: {
        id: 'ford',
        description: [
            'Gets a <strong>“5 for 4” deal on Classic Ads</strong>.',
            'Gets a discount on <strong>Standout Ads where the price drops to $309.99 per ad</strong>.',
            'Gets a discount on <strong>Premium Ads when 3 or more</strong> are purchased. The price drops to <strong>$389.99 per ad</strong>.'
        ],
        priority: 5
      },
      status: 200
    }
  }
];

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

  testData.forEach(function (data) {

    it('it should GET customer priviledge of `'+data.query.id+'`', (done) => {

      chai.request(server).get('/customers?id='+data.query.id).end((err, res) => {

        expect(res.body).to.be.a('array');
        expect(res.body[0]).to.be.a('object');
        expect(res.body).not.equal(0);
        expect(res).to.have.status(data.expected.status);
        expect(res.body[0].id).equal(data.expected.body.id);
        expect(res.body[0].description).to.be.a('array');
        expect(res.body[0].priority).equal(data.expected.body.priority);

        done();
      });
    });
  });
});
