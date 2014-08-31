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
var mapNodes;


leaf.initializeMap();

leaf.locate(processPosition);

//get current position before rendering anything
function processPosition(position) {
  console.log('Found position!');
  console.log(position);


  if (currentPosition &&
      JSON.stringify(currentPosition.latlng) === JSON.stringify(position.latlng)) {
    mapNodes.sort();
  } else {
    overpass.performRequest({lat: position.latitude, lon: position.longitude},
                            '["leisure"="playground"]', processOverpassResults);
  }

  currentPosition = position;
}


function processOverpassResults(result) {
  result.currentPosition = {lat: currentPosition.latitude, lon: currentPosition.longitude};
  mapNodes = new mapNode.Collection(result, {parse: true});
  mapNodes.removeDuplicates();

  mapNodes.each(createView);
}


function createView(mapNode, index) {

  leaf.addMarker(mapNode.toCoords(), {
    popupText: 'Spielplatz #' + (index+1),
  });

  var cardView = new CardView({model: mapNode});

  $('main').append(cardView.el);
}
