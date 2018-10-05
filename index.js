'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PricingRules = require('./controllers/pricing-rules');
app.use(bodyParser.json());
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
app.post('/calculate', function (req, res) {
  console.log('/calculate');
  let pricingRules = new PricingRules(req.body.customer);
  let items = req.body.skus;
  items.forEach(function (item) {
    pricingRules.add(item);
  });
  let total = pricingRules.total();
  res.send(total);
});
