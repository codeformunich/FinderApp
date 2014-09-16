'use strict';

var AmpersandView = require('ampersand-view');
var template = require('./templates/card');

module.exports = AmpersandView.extend({
  autoRender: true,
  template: template,

  events: {
    'click' : 'showDetails'
  },

  bindings: {
    'model.distance': {
      type: 'text',
      hook: 'distance'
    }
  },

  showDetails: function() {
    app.user.targetId = this.model.osmId;
    console.log(app.user.targetId);
  }
});
