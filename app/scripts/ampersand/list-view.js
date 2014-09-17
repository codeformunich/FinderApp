'use strict';

var $ = require('jquery');
var AmpersandView = require('ampersand-view');
var CardView = require('./card-view');
var template = require('./templates/list.hbs');

module.exports = AmpersandView.extend({
  template: template,

  render: function() {
    this.renderWithTemplate();
    this.renderCollection(this.collection, CardView, this.el);

    return this;
  },

  showTarget: function(targetNode) {
    this.el.classList.add('card-list--full');

    var index = this.collection.indexOf(targetNode);

    $(this.el).find('li').css('left', -85 * index + '%');
  }
});
