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

//Custom code
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

leaf.initializeMap();

//get current position before rendering anything
navigator.geolocation.getCurrentPosition(function(position) {
  console.log('Found position!');
  currentPosition = {
    lat: position.coords.latitude,
    lon: position.coords.longitude
  };

  overpass.performRequest(currentPosition, '["leisure"="playground"]', processOverpassResults);
});
