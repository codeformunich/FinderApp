'use strict';

var AmpersandView = require('ampersand-view');
var CardView = require('./card-view');
var template = require('./templates/list.hbs');

module.exports = AmpersandView.extend({
  template: template,

  render: function() {
    console.log('test');
    this.renderWithTemplate();
    this.renderCollection(this.collection, CardView, this.el);

    return this;
  }
});
