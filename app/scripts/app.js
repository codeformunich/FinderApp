//requires
'use strict';
var $ = require('jquery');
var MapNodeCollection = require('./ampersand/map-node-collection');
var UserState = require('./ampersand/user-state');
var ListView = require('./ampersand/list-view');
var MapView = require('./ampersand/map-view');
var overpass = require('./overpass');
var starterkit = require('./vendor/starterkit');

starterkit.initialize();

module.exports = {

  blastoff: function() {
    window.app = this;
    this.user = new UserState();

    app.mapNodes = new MapNodeCollection();

    var mapView = new MapView({collection: app.mapNodes});
    $('main').append(mapView.el);
    mapView.renderMap();

    this.user.locate(this.processPosition);
    console.log('Blastoff!');
  },

  processPosition: function(position) {
    overpass.performRequest({lat: position.coords.latitude,
                            lon: position.coords.longitude},
                            '["leisure"="playground"]',
                            app.processOverpassResults);

  },

  processOverpassResults: function(nodesArray) {
    app.mapNodes.add(nodesArray);
    app.mapNodes.removeDuplicates();
    app.mapNodes.trigger('sync');

    var listView = new ListView({collection: app.mapNodes});
    listView.render();
    $('main').append(listView.el);
  }
};

module.exports.blastoff();
