'use strict';

var AmpersandRouter = require('ampersand-router');

module.exports = AmpersandRouter.extend({

  routes: {
    'details': 'details',    // #help
  },

  details: function() {
    app.mapView.showFullScreen();
    app.listView.showFullScreen();
  }

});
