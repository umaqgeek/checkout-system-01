'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PricingRules = require('./controllers/pricing-rules');
const Advertisement = require('./models/advertisement-model');
app.use(bodyParser.json());
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
  console.log('/calculate');
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
// REST API /advertisement.
app.get('/advertisement', function (req, res) {
  console.log('/advertisement');
  let ads = new Advertisement();
  let adsId = typeof req.query.id !== 'undefined' ? req.query.id : 'all';
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
