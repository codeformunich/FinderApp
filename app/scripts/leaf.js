/**
 * A module for encapsulating the interaction with leaflet.js
 */
var leaf = (function () {
  'use strict';
  var map;
  var apikey = 'a5fdf236c7fb42d794a43e94be030fb2';


  function initializeMap() {
    map = L.map('map');

    if(L.Browser.retina){
        var tp = "lr";
    }
    else {
        var tp = "ls";
    }

    L.tileLayer('http://tiles.lyrk.org/'+ tp +'/{z}/{x}/{y}?apikey=' + apikey, {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(map);
    map.locate({setView: true, maxZoom: 16});
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

  return {
    initializeMap: initializeMap,
    addMarker: addMarker
  }
})();
