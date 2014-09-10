/**
 * A module for encapsulating the interaction with leaflet.js
 */
'use strict';

var L = require('leaflet');

var map;
var apikey = 'a5fdf236c7fb42d794a43e94be030fb2';

var positionMarker;

function setUserPosition(e) {
  var radius = e.accuracy / 2;

  if (positionMarker) {
    map.removeLayer(positionMarker);
  }

  positionMarker = new L.Circle(e.latlng, radius);
  map.addLayer(positionMarker);
}

function onLocationError(e) {
  alert(e.message);
}

function initializeMap() {
  var tp;

  L.Icon.Default.imagePath = '/images/leaflet';
  map = L.map('map');

  if (L.Browser.retina) {
    tp = 'lr';
  }
  else {
    tp = 'ls';
  }

  L.tileLayer('http://tiles.lyrk.org/' + tp + '/{z}/{x}/{y}?apikey=' + apikey,
   {
     attribution: '<a href="http://leafletjs.com" title="A JS library for ' +
                  'interactive maps">Leaflet</a> | Data: ' +
                  '<a href="http://www.overpass-api.de/">OverpassAPI</a>/ODbL' +
                  ' OpenStreetMap | <a href="http://geodienste.lyrk.de/" ' +
                  'target="_blank">Tiles by Lyrk</a> | <a href="http://' +
                  'geodienste.lyrk.de/copyright">Lizenzinformationen</a></div>',
     maxZoom: 18
   }).addTo(map);
}

function locate(cb) {
  map.on('locationfound', setUserPosition);
  map.on('locationfound', cb);
  map.on('locationerror', onLocationError);

  map.locate({setView: true, maxZoom: 16, watch: true});
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

  if (options.popupText) {
    marker.bindPopup(options.popupText);
  }
}

exports.initializeMap = initializeMap;
exports.locate = locate;
exports.addMarker = addMarker;
