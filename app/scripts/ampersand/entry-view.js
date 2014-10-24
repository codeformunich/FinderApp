'use strict';

var AmpersandView = require('ampersand-view');
var template = require('./templates/entry');

module.exports = AmpersandView.extend({
  template: template,

  events: {
    'click [data-action=locate]' : 'useLocation'
  },

  useLocation: function() {
    app.user.locate();
  }
});
