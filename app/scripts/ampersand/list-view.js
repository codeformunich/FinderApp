'use strict';

var $ = require('jquery');
var AmpersandView = require('ampersand-view');
var CardView = require('./card-view');
var template = require('./templates/list.hbs');

module.exports = AmpersandView.extend({
  template: template,

  initialize: function() {
    this.listenTo(this.collection, 'change:selectedNode', this.showSelected);
  },

  render: function() {
    this.renderWithTemplate();
    this.renderCollection(this.collection, CardView, this.el);

    return this;
  },

  showDetails: function(targetNode) {
    this.el.classList.add('card-list--full');

    if (targetNode) {
      this.showTargetNode(targetNode);
    }
  },

  showSelected: function() {
    var index = this.collection.indexOf(this.collection.selectedNode);
    $(this.el).find('li').css('left', -85 * index + '%');
  }
});
