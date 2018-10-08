'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PricingRules = require('./controllers/pricing-rules');
const Advertisements = require('./models/advertisement-model');
const Customers = require('./models/customer-model');

app.use(bodyParser.json());

app.use(function (req, res, next) {
  // Websites to allow to connect
  let allowedOrigins = [
    'http://127.0.0.1:8080',
    'http://localhost:8080',
    'https://sja-checkout-system.firebaseapp.com'
  ];
  let origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  // Request methods to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // True for website to include cookies in the requests sent
  // to the API (e.g. in case using sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

// app start at port 8081.
app.listen(8081, function () {
  console.log("\x1b[32m");
  console.log(" _____ _             _           _    ____  _  __");
  console.log("/ ____| |           | |         | |  / __ \\| |/ /");
  console.log("| (___| |_ __ _ _ __| |_ ___  __| | | |  | | ' / ");
  console.log("\\___ \\| __/ _` | '__| __/ _ \\/ _` | | |  | |  <  ");
  console.log("____) | || (_| | |  | ||  __/ (_| | | |__| | . \\ ");
  console.log("|_____/\\__\\__,_|_|   \\__\\___|\\__,_|  \\____/|_|\\_\\");
  console.log("\x1b[0m");
  console.log("Architect app started OK");
});

// REST API /calculate.
app.post('/calculate', function (req, res) {
  console.log('GET /calculate');
  let customer = typeof req.body.customer !== 'undefined' ? req.body.customer :
    'default';
  let pricingRules = new PricingRules(customer);
  let items = typeof req.body.skus !== 'undefined' && req.body.skus.length > 0
    ? req.body.skus : [];
  items.forEach(function (item) {
    pricingRules.add(item);
  });
  let total = pricingRules.total();
  res.send(total);
});

// REST API /advertisements.
app.get('/advertisements', function (req, res) {
  console.log('/advertisements');
  let ads = new Advertisements();
  let adsId = typeof req.query.id !== 'undefined' ?
    req.query.id.toLowerCase() : 'all';
  let outData;
  if (adsId !== 'all') {
    outData = ads.data.filter(function (ad) {
      return ad.id.toLowerCase() === adsId;
    });
  } else {
    outData = ads.data;
  }
  res.send(outData);
});

// REST API /customers.
app.get('/customers', function (req, res) {
  console.log('/customers');
  let customers = new Customers();
  let customerId = typeof req.query.id !== 'undefined' ?
    req.query.id.toLowerCase() : 'all';
  let outData;
  if (customerId !== 'all') {
    outData = customers.data.filter(function (customer) {
      return customer.id.toLowerCase() === customerId;
    });
  } else {
    outData = customers.data;
  }
  res.send(outData);
});

module.exports = app;
