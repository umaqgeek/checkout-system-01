'use strict';

module.exports = function (pricingKey) {

  this.pricingKey = typeof pricingKey !== 'undefined' ? pricingKey : 'default';
  let items = [];

  this.add = function (item) {
    items.push(item);
  };

  this.total = function () {

    

    return items;
  };
};
