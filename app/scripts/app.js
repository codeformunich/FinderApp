//requires
'use strict';
var $ = require('jquery');
var leaf = require('./leaf');
var mapNodeCollection = require('./ampersand/map-node-collection');
var ListView = require('./ampersand/list-view');
var overpass = require('./overpass');
var starterkit = require('./vendor/starterkit');

starterkit.initialize();

module.exports = {

  blastoff: function() {
    window.app = this;
    leaf.initializeMap();
    leaf.locate(app.processPosition);
    console.log('Blastoff!');
  },

  processPosition: function(position) {
    console.log('Found position!');
    console.log(position);

    if (!app.currentPosition) {
      app.currentPosition = position;
      overpass.performRequest({lat: position.latitude, lon: position.longitude},
                              '["leisure"="playground"]',
                              app.processOverpassResults);
    } else if (JSON.stringify(app.currentPosition.latlng) !==
                JSON.stringify(position.latlng)) {
      app.currentPosition = position;

      if (app.mapNodes) {
        app.mapNodes.sort();
      }
    }
  },

  processOverpassResults: function(nodesArray) {
    app.mapNodes = new mapNodeCollection(nodesArray);
    app.mapNodes.removeDuplicates();

    var listView = new ListView({collection: app.mapNodes});
    listView.render();
    $('main').append(listView.el);

    app.mapNodes.each(function(mapNode, index) {
      leaf.addMarker(mapNode.toCoords(), {
        popupText: 'Spielplatz #' + (index + 1),
      });
    });
  }
};

module.exports.blastoff();
