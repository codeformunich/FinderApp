'use strict';

var AmpersandRouter = require('ampersand-router');

module.exports = AmpersandRouter.extend({

  routes: {
    '': 'showEntry',
    'list': 'showList',
    'details': 'showDetails'   // #help
  },

  showEntry: function() {
    app.controller.showEntry();
  },

  showList: function() {
    console.log('show list');
    app.mapNodes.selectNode(undefined);
    app.user.showDetails = false;
  },

  showDetails: function() {
    app.user.showDetails = true;
  }

});
