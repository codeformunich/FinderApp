'use strict';

var $ = require('jquery');
var AmpersandView = require('ampersand-view');
var CardView = require('./card-view');
var template = require('./templates/list.hbs');

//Initialize touchswipe on jquery
var $ = require('jquery');
require('touchswipe')($);

module.exports = AmpersandView.extend({
  autoRender: true,
  template: template,

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.renderCards);
    this.listenTo(this.collection, 'change:selectedNode', this.showSelected);

    var _this = this;
    window.addEventListener('orientationchange', function() {
      _this.enableSwipe(true);
    }, false);
  },

  render: function() {
    this.renderWithTemplate();

    $(this.el).swipe({
      swipe:function(event, direction, distance, duration, fingerCount) {
        if (direction === 'left') {
          app.mapNodes.selectNextNode();
        } else if (direction === 'right') {
          app.mapNodes.selectPreviousNode();
        }
      },
    });

    this.triggerDetails(false);

    return this;
  },

  renderCards: function() {
    $(this.el).empty();
    this.collectionView = this.renderCollection(this.collection,
                                                  CardView, this.el);
  },

  triggerDetails: function(showDetails) {
    if (showDetails) {
      this.enableSwipe(true);
      this.el.classList.add('cards--full');
    } else {
      this.enableSwipe(false);
      this.el.classList.remove('cards--full');
      $(this.el).find('li').css('left', 0);
    }
  },

  enableSwipe: function(flag) {
    if (flag && !window.matchMedia('(min-width:860px)').matches) {
      $(this.el).swipe('enable');
    } else {
      $(this.el).swipe('disable');
    }
  },

  showSelected: function() {
    var selectedIndex;
    var selectedNode = this.collection.selectedNode;
    this.collectionView.views.forEach(function(view, index) {
      if (selectedNode === view.model) {
        view.showAsSelected(true);
        selectedIndex = index;
      } else {
        view.showAsSelected(false);
      }
    });

    if (!window.matchMedia('(min-width:860px)').matches) {
      $(this.el).find('li').css('left', -85 * selectedIndex + '%');
    } else {
      //TODO: find correct scrolling algorithm, only scroll when necessary
    }
  }
});
