'use strict';
module.exports = function() {
  // promotion for unilever.
  this.unilever = ['Gets a <strong>“3 for 2” deal on Classic Ads</strong>.'];
  // promotion for apple.
  this.apple = ['Gets a discount on <strong>Standout Ads where the price '+
    'drops to $299.99 per ad</strong>.'];
  // promotion for nike.
  this.nike = ['Gets a discount on <strong>Premium Ads where 4 or more'+
    '</strong> are purchased. The price drops to <strong>$379.99 per ad'+
    '</strong>.'];
  // promotion for ford.
  this.ford = [
    'Gets a <strong>“5 for 4” deal on Classic Ads</strong>.',
    'Gets a discount on <strong>Standout Ads where the price drops to $309.99'+
      ' per ad</strong>.',
    'Gets a discount on <strong>Premium Ads when 3 or more</strong> are '+
      'purchased. The price drops to <strong>$389.99 per ad</strong>.'
  ];
  // pricing rule for unilever.
  this.getUnilever = function (confirmedItems) {
    let total = 0;
    let countClassic = confirmedItems.filter(function (item) {
      return item.id.toLowerCase() === 'classic'
    }).length;
    let afterCountClassic = parseInt(countClassic / 3);
    let tempItems = [];
    confirmedItems.forEach(function (item) {
      tempItems.push(item);
    });
    if (tempItems.length > 0) {
      for (var i = tempItems.length - 1; i--;) {
        if (tempItems[i].id === 'classic' && afterCountClassic > 0) {
          tempItems.splice(i, 1);
          afterCountClassic--;
        }
      }
    }
    tempItems.forEach(function (item) {
      total += item.normalPrice;
    });
    return total;
  };
  // pricing rule for apple.
  this.getApple = function (confirmedItems) {
    let total = 0;
    confirmedItems.forEach(function (item) {
      total += (item.id.toLowerCase() === 'standout' ?
        item.options.applePrice : item.normalPrice);
    });
    return total;
  };
  // pricing rule for nike.
  this.getNike = function (confirmedItems) {
    let total = 0;
    let countPremium = confirmedItems.filter(function (item) {
      return item.id.toLowerCase() === 'premium'
    }).length;
    confirmedItems.forEach(function (item) {
      total += (item.id.toLowerCase() === 'premium' && countPremium >= 4 ?
        item.options.nikePrice : item.normalPrice);
    });
    return total;
  };
  // pricing rule for ford.
  this.getFord = function (confirmedItems) {
    let total = 0;
    let countClassic = confirmedItems.filter(function (item) {
      return item.id.toLowerCase() === 'classic'
    }).length;
    let afterCountClassic = parseInt(countClassic / 5);
    let tempItems = [];
    confirmedItems.forEach(function (item) {
      tempItems.push(item);
    });
    if (tempItems.length > 0) {
      for (var i = tempItems.length - 1; i--;) {
        if (tempItems[i].id === 'classic' && afterCountClassic > 0) {
          tempItems.splice(i, 1);
          afterCountClassic--;
        }
      }
    }
    let countPremium = tempItems.filter(function (item) {
      return item.id.toLowerCase() === 'premium'
    }).length;
    tempItems.forEach(function (item) {
      total += (item.id.toLowerCase() === 'standout' ?
        item.options.fordPrice :
        (item.id.toLowerCase() === 'premium' && countPremium >= 3 ?
          item.options.fordPrice : item.normalPrice));
    });
    return total;
  };
  // pricing rule for default or others.
  this.getDefault = function (confirmedItems) {
    let total = 0;
    confirmedItems.forEach(function (item) {
      total += item.normalPrice;
    });
    return total;
  };
};
