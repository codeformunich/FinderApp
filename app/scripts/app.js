//requires
'use strict';
var $ = require('jquery');
var leaf = require('./leaf');
var mapNode = require('./backbone/map-node');
var ListView = require('./backbone/list-view');
var overpass = require('./overpass');
var starterkit = require('./vendor/starterkit');

starterkit.initialize();

var mapNodes;


leaf.initializeMap();

leaf.locate(processPosition);

//get current position before rendering anything
function processPosition(position) {
  console.log('Found position!');
  console.log(position);

  if (!window.currentPosition) {
    window.currentPosition = position;
    overpass.performRequest({lat: position.latitude, lon: position.longitude},
                            '["leisure"="playground"]', processOverpassResults);
  } else if (JSON.stringify(window.currentPosition.latlng) !== JSON.stringify(position.latlng)) {
    window.currentPosition = position;
    mapNodes.sort();
  }
}


function processOverpassResults(result) {
  mapNodes = new mapNode.Collection(result, {parse: true});
  mapNodes.removeDuplicates();

  var listView = new ListView({collection: mapNodes});
  $('main').append(listView.el);

  mapNodes.each(function(mapNode, index) {
    leaf.addMarker(mapNode.toCoords(), {
      popupText: 'Spielplatz #' + (index+1),
    });
  });
}
