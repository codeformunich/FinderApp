'use strict';

var AmpersandView = require('ampersand-view');
var template = require('./templates/card');

module.exports = AmpersandView.extend({
  autoRender: true,
  template: template,

  bindings: {
    'model.distance': {
      type: 'text',
      hook: 'distance'
    }
  }
});
