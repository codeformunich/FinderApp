'use strict';

var AmpersandRouter = require('ampersand-router');

module.exports = AmpersandRouter.extend({

  routes: {
    '/': 'showList',
    'details': 'showDetails'   // #help
  },

  showList: function() {
    app.user.showDetails = false;
  },

  showDetails: function() {
    app.user.showDetails = true;
  }

});
