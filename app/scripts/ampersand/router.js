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
    app.mapNodes.selectNode(undefined);
    app.user.trigger('showList');
  },

  showDetails: function() {
    app.user.trigger('showDetails');
  }

});
