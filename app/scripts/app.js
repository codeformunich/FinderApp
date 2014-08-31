//requires
'use strict';
var $ = require('jquery');
var leaf = require('./leaf');
var bone = require('./bone');
var overpass = require('./overpass');
var starterkit = require('./vendor/starterkit');

starterkit.initialize();

var currentPosition;

//Custom code
function processOverpassResults(result) {
  result.currentPosition = currentPosition;
  var results = new bone.ResultCollection(result, {parse: true});
  results.removeDuplicates();
  console.log(results);

  results.each(createView);
}


function createView(result, index) {
  console.log(result);
  // if (result.get('type') === 'way') {
    leaf.addMarker(result.toCoords(), {
      popupText: 'Spielplatz #' + (index+1),
    });
  // }

  var resultView = new bone.ResultView({model: result});

  $('main').append(resultView.el);
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
