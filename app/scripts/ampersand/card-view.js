'use strict';

var AmpersandView = require('ampersand-view');
var template = require('./templates/card');

module.exports = AmpersandView.extend({
  autoRender: true,
  template: template,

  events: {
    // 'click' : 'showDetails'
  },

  bindings: {
    'model.distance': {
      type: 'text',
      hook: 'distance'
    }
  },

  showDetails: function() {
    app.user.showDetails = true;
    this.model.collection.selectNode(this.model);
    console.log(this.model.collection.selectedNode);
  }
});
