/**
 * A module for encapsulating the interaction with leaflet.js
 */
var leaf = (function () {
  'use strict';
  var map;


  function initializeMap() {
    map = L.map('map');
    L.tileLayer('http://{s}.tiles.mapbox.com/v3/jancborchardt.j7aheln6/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(map);
    map.locate({setView: true, maxZoom: 16});
  }

  function addMarker(coords, popupText)  {
    L.marker([coords.lat, coords.lon])
      .addTo(map).bindPopup(popupText);
  }

  return {
    initializeMap: initializeMap,
    addMarker: addMarker
  }
})();
