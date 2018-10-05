'use strict';
const express = require('express');
const app = express();
const PricingRules = require('./controllers/pricing-rules');
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
app.get('/calculate', function (req, res) {
  let pricingRules = new PricingRules(req.query.customer);
  let items = req.query.skus.split(',');
  items.forEach(function (item) {
    pricingRules.add(item);
  });
  let total = pricingRules.total();
  console.log(total);
  res.send(total);
});
