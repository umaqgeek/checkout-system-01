'use strict';
module.exports = function() {
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
  this.getApple = function (confirmedItems) {
    let total = 0;
    confirmedItems.forEach(function (item) {
      total += (item.id.toLowerCase() === 'standout' ?
        item.options.applePrice : item.normalPrice);
    });
    return total;
  };
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
  this.getDefault = function (confirmedItems) {
    let total = 0;
    confirmedItems.forEach(function (item) {
      total += item.normalPrice;
    });
    return total;
  };
};
