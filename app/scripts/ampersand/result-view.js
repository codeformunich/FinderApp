'use strict';

var AmpersandView = require('ampersand-view');
var ListView = require('./list-view');
var MapView = require('./map-view');
var template = require('./templates/result');

module.exports = AmpersandView.extend({
  template: template,

  initialize: function() {
    this.listenTo(app.user, 'change:selectedNode', this.showDetails);
  },

  render: function() {
    this.renderWithTemplate();
    this.resultsEl = this.queryByHook('results');
    this.mapView = new MapView({collection: this.collection});
    this.listView = new ListView({collection: this.collection});
    this.resultsEl.appendChild(this.mapView.el);
    this.resultsEl.appendChild(this.listView.el);
  },

  showDetails: function() {
    this.listView.triggerDetails(true);
    this.mapView.triggerDetails(true);
  },

  showList: function() {
    if (!window.matchMedia('(min-width:860px)').matches) {
      this.listView.triggerDetails(false);
      this.mapView.triggerDetails(false);
    }
  }
});
