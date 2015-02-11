'use strict';

var AmpersandRouter = require('ampersand-router');

module.exports = AmpersandRouter.extend({

  routes: {
    '': 'showEntry',
    'list': 'showList',
    'details': 'showDetails',   // #help
    'about': 'showAbout'   // #help
  },

  showEntry: function() {
    app.controller.showEntry();
  },

  showList: function() {
    if (app.user.position || app.user.postcode) {
      app.mapNodes.selectNode(undefined);
      app.user.trigger('showList');
    } else {
      app.controller.showEntry();
    }
  },

  showDetails: function() {
    if (app.user.position || app.user.postcode) {
      app.user.trigger('showDetails');
    } else {
      app.controller.showEntry();
    }
  },

  showAbout: function() {
    app.user.trigger('aboutPage');
  }

});
