//requires
'use strict';
var $ = require('jquery');
var leaf = require('./leaf');
var mapNodeCollection = require('./backbone/map-node-collection');
var ListView = require('./backbone/list-view');
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

  processOverpassResults: function(result) {
    app.mapNodes = new mapNodeCollection(result, {parse: true});
    app.mapNodes.removeDuplicates();
    console.log(app.mapNodes);

    var listView = new ListView({collection: app.mapNodes});
    $('main').append(listView.el);

    app.mapNodes.each(function(mapNode, index) {
      leaf.addMarker(mapNode.toCoords(), {
        popupText: 'Spielplatz #' + (index + 1),
      });
    });
  }
};

module.exports.blastoff();
