'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var template = require('./templates/card');
Backbone.$ = $;

module.exports = Backbone.View.extend({

  initialize: function() {
    this.render();
  },

  render: function() {
    // Load the compiled HTML into the Backbone "el"
    this.$el.html(template(this.model));
  }
});
