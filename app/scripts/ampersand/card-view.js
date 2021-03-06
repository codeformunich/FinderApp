'use strict';

var $ = require('jquery');
var AmpersandView = require('ampersand-view');
var template = require('./templates/card');

module.exports = AmpersandView.extend({
  autoRender: true,
  template: template,

  events: {
    'click' : 'showDetails'
  },

  bindings: {
    'model.distanceText': {
      type: 'text',
      hook: 'distance'
    }
  },

  showDetails: function() {
    app.user.trigger('showDetails', this.model);
    console.log(this.model.collection.selectedNode);
  },

  showAsSelected: function(flag) {
    var $el = $(this.el);

    if (flag) {
      $el.removeClass('card--deselected');
      $el.addClass('card--selected');
    } else {
      $el.removeClass('card--selected');
      $el.addClass('card--deselected');
    }
  }
});
