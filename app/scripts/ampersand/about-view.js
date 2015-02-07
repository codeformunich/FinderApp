'use strict';

var AmpersandView = require('ampersand-view');
var template = require('./templates/about');

module.exports = AmpersandView.extend({
  autoRender: true,
  template: template,
});
