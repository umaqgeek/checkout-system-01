'use strict';
const Advertisement = require('./../models/advertisement-model');
const Rules = require('./../controllers/rules');
const rules = new Rules();
module.exports = function (customer) {
  console.log(customer);
  customer = typeof customer !== 'undefined' ? customer : 'default';
  customer = customer.charAt(0).toUpperCase()+customer.slice(1);
  let items = []; // array of items.
  let confirmedItems = []; // array of items that has been filtered.
  // function to add items into cart.
  this.add = function (item) {
    items.push(item);
  };
  // function to calculate all checkout items in the cart and return the result.
  this.total = function () {
    let total = 0; // initial total price is zero.
    // if items are exist.
    if (items.length > 0) {
      let ads = new Advertisement().data;
      // filter only the identified items into new array.
      items.forEach(function (item) {
        let adArr = ads.filter(function (ad) {
          return item.toLowerCase() === ad.id.toLowerCase();
        });
        if (adArr.length > 0) {
          confirmedItems.push({
            'priority': adArr[0].priority,
            'id': adArr[0].id,
            'name': item.charAt(0).toUpperCase() + item.slice(1),
            'normalPrice': adArr[0].normalPrice,
            'options': adArr[0].options
          });
        }
      });
      // apply pricing rules.
      switch (customer.toLowerCase()) {
        // pricing rules for `unilever`.
        case 'unilever': {
          total = rules.getUnilever(confirmedItems);
        }
        break;
        // pricing rules for `apple`.
        case 'apple': {
          total = rules.getApple(confirmedItems);
        }
        break;
        // pricing rules for `nike`.
        case 'nike': {
          total = rules.getNike(confirmedItems);
        }
        break;
        // pricing rules for `ford`.
        case 'ford': {
          total = rules.getFord(confirmedItems);
        }
        break;
        case 'default':
        default: {
          total = rules.getDefault(confirmedItems);
        }
      }
    }
    // trim text of SKUs.
    let skusScanned = '';
    confirmedItems.sort(function(a, b){return a.priority - b.priority});
    confirmedItems.forEach(function (item, index, confirmedItems) {
      skusScanned += '`'+item.name+'`';
      if (index !== confirmedItems.length - 1) {
        skusScanned += ', ';
      }
    });
    // return show text and results.
    return 'Customer: '+customer+'\n'+
      'SKUs scanned: '+skusScanned+'\n'+
      'Total expected: $'+total.toFixed(2);
  };
};
