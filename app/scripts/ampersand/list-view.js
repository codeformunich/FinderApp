'use strict';

var $ = require('jquery');
var AmpersandView = require('ampersand-view');
var CardView = require('./card-view');
var template = require('./templates/list.hbs');

//Initialize touchswipe on jquery
var $ = require('jquery');
require('touchswipe')($);

module.exports = AmpersandView.extend({
  template: template,

  initialize: function() {
    this.listenTo(this.collection, 'change:selectedNode', this.showSelected);
  },

  render: function() {
    this.renderWithTemplate();
    this.renderCollection(this.collection, CardView, this.el);

    $(this.el).swipe({
      swipe:function(event, direction, distance, duration, fingerCount) {
        if (direction === 'left') {
          app.mapNodes.selectNextNode();
        } else if (direction === 'right') {
          app.mapNodes.selectPreviousNode();
        }
      },
    });

    return this;
  },

  triggerDetails: function(showDetails) {
    if (showDetails) {
      this.el.classList.add('card-list--full');
    } else {
      this.el.classList.remove('card-list--full');
      $(this.el).find('li').css('left', 0);
    }
  },

  showSelected: function() {
    var index = this.collection.indexOf(this.collection.selectedNode);
    $(this.el).find('li').css('left', -85 * index + '%');
  }
});
