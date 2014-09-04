'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
var CardView = require('./card-view');
Backbone.$ = $;

module.exports = Backbone.View.extend({

  initialize: function() {
    this.childViews = [];
    this.render();

    this.listenTo(this.collection, 'sort', this.render);
  },

  render: function() {
    this.removeChildren();
    console.log('redraw');

    // Compile the template using underscore
    this.collection.each(function(model) {
      var cardView = new CardView({model: model});
      this.$el.append(cardView.el);

      this.childViews.push(cardView);
    }, this);
    // Load the compiled HTML into the Backbone "el"
  },

  removeChildren: function() {
    _.each(this.childViews, function(view) {
      view.remove();
    });
  }
});
