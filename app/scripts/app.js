//requires
'use strict';
var $ = require('jquery');
var leaf = require('./leaf');
var mapNode = require('./backbone/map-node');
var CardView = require('./backbone/card-view');
var overpass = require('./overpass');
var starterkit = require('./vendor/starterkit');

starterkit.initialize();

var currentPosition;


leaf.initializeMap();

leaf.locate(positionFound);

//get current position before rendering anything
function positionFound(position) {
  console.log('Found position!');
  console.log(position);
  
  currentPosition = {
    lat: position.latitude,
    lon: position.longitude
  };

  overpass.performRequest(currentPosition, '["leisure"="playground"]', processOverpassResults);
}


function processOverpassResults(result) {
  result.currentPosition = currentPosition;
  var mapNodes = new mapNode.Collection(result, {parse: true});
  mapNodes.removeDuplicates();
  console.log(mapNodes);

  mapNodes.each(createView);
}


function createView(mapNode, index) {

  leaf.addMarker(mapNode.toCoords(), {
    popupText: 'Spielplatz #' + (index+1),
  });

  var cardView = new CardView({model: mapNode});

  $('main').append(cardView.el);
}
