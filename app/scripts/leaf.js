/**
 * A module for encapsulating the interaction with leaflet.js
 */
'use strict';

var L = require('leaflet');

var map;
var apikey = 'a5fdf236c7fb42d794a43e94be030fb2';


function initializeMap() {
  var tp;

  L.Icon.Default.imagePath = '/images/leaflet';
  map = L.map('map');

  if(L.Browser.retina){
    tp = 'lr';
  }
  else {
    tp = 'ls';
  }

  L.tileLayer('http://tiles.lyrk.org/'+ tp +'/{z}/{x}/{y}?apikey=' + apikey, {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18
  }).addTo(map);
}


function locate(cb) {
  map.on('locationfound', onLocationFound);
  map.on('locationfound', cb);
  map.on('locationerror', onLocationError);

  map.locate({setView: true, maxZoom: 16, watch: true});
}


function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.circle(e.latlng, radius).addTo(map);
}

function onLocationError(e) {
    alert(e.message);
}


function addMarker(coords, markerOptions)  {
  var options = markerOptions || {};
  var marker;

  if (options.circle === true) {
    marker = L.circleMarker([coords.lat, coords.lon]);
  } else {
    marker = L.marker([coords.lat, coords.lon]);
  }

  marker.addTo(map);

  if(options.popupText){
    marker.bindPopup(options.popupText);
  }
}


module.exports = {
  initializeMap: initializeMap,
  locate: locate,
  addMarker: addMarker
};
