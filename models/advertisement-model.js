'use strict';

module.exports = function () {
  
  this.data = [
    {
      id: 'classic',
      name: 'Classic Ad',
      normalPrice: 269.99,
      description: 'Offers the most basic level of advertisement.',
      priority: 1,
      options: {
      }
    },
    {
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
    {
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
    }
  ];
};
