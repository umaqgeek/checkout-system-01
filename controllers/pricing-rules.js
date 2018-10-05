'use strict';
const Advertisement = require('./../models/advertisement-model');
module.exports = function (pricingKey) {
  this.pricingKey = typeof pricingKey !== 'undefined' ? pricingKey : 'default';
  let items = []; // array of items.
  let confirmedItems = []; // array of items that has been filtered.
  // function to add items into cart.
  this.add = function (item) {
    items.push(item);
  };
  // function to calculate all checkout items in the cart.
  this.total = function () {
    let total = 0;
    if (items.length > 0) {
      let ads = new Advertisement().data;
      items.forEach(function (item) {
        let adArr = ads.filter(function (ad) {
          return item.toLowerCase() === ad.id.toLowerCase();
        });
        if (adArr.length > 0) {
          confirmedItems.push(item);
        }
      });
      
    }
    return total;
  };
};
