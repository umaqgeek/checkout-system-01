'use strict';

module.exports = function () {

  this.data = [
    // promotion for default.
    {
      id: 'default',
      description: [],
      priority: 1
    },
    // promotion for unilever.
    {
      id: 'unilever',
      description: ['Gets a <strong>“3 for 2” deal on Classic Ads</strong>.'],
      priority: 2
    },
    // promotion for apple.
    {
      id: 'apple',
      description: ['Gets a discount on <strong>Standout Ads where the price '+
        'drops to $299.99 per ad</strong>.'],
      priority: 3
    },
    // promotion for nike.
    {
      id: 'nike',
      description: ['Gets a discount on <strong>Premium Ads where 4 or more'+
        '</strong> are purchased. The price drops to <strong>$379.99 per ad'+
        '</strong>.'],
      priority: 4
    },
    // promotion for ford.
    {
      id: 'ford',
      description: [
        'Gets a <strong>“5 for 4” deal on Classic Ads</strong>.',
        'Gets a discount on <strong>Standout Ads where the price drops to $309.99'+
          ' per ad</strong>.',
        'Gets a discount on <strong>Premium Ads when 3 or more</strong> are '+
          'purchased. The price drops to <strong>$389.99 per ad</strong>.'
      ],
      priority: 5
    }
  ];
};
