'use strict';

module.exports = function (id, name, price, description) {

  this.id = id;
  this.name = name;
  this.price = price;
  this.description = description;

  this.data = {
    Classic: {
      name: 'Classic Ad',
      price: 269.99,
      description: 'Offers the most basic level of advertisement.'
    },
    Standout: {
      name: 'Standout Ad',
      price: 322.99,
      description: 'Allows advertisers to use a company logo and use a longer presentation text.'
    },
    Premium: {
      name: 'Premium Ad',
      price: 394.99,
      description: 'Same benefits as Standout Ad, but also puts the advertisement at the top of the results, allowing higher visibility.'
    }
  };
};
