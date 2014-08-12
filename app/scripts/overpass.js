(function () {
  'use strict';

  var overpassUrl = "http://overpass-api.de/api/interpreter?data=[out:json][timeout:25];";
  var overpassOutputParams = ';out body;>;out skel qt;';


  getLocation();

  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(usePosition);
      } else {
          alert("Geolocation is not supported by this browser.");
      }
  }

  function usePosition(position) {
      console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
      console.log("Distance: " + getDistanceBetween(position.coords, position.coords))
      $.getJSON('http://overpass-api.de/api/interpreter?data=[out:json][timeout:25];(node["leisure"="playground"](48.113047481277384,11.541824340820312,48.163566497754275,11.60207748413086);way["leisure"="playground"](48.113047481277384,11.541824340820312,48.163566497754275,11.60207748413086););out body;>;out skel qt;',
      function( data ) {
        console.log(data);
      });
  }

  function degreesToRadians(deg) {
    return deg * (Math.PI/180);
  }

  //dist = arccos(sin(lat1) · sin(lat2) + cos(lat1) · cos(lat2) · cos(lon1 - lon2)) · R
  function getDistanceBetween(coords_1, coords_2) {
    var earthRad = 6371,
        lat1 = degreesToRadians(coords_1.latitude),
        lon1 = degreesToRadians(coords_1.longitude),
        lat2 = degreesToRadians(coords_2.latitude),
        lon2 = degreesToRadians(coords_2.longitude);

    var dist = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2)) * earthRad;

    return dist;
  }

  function getBoundingBoxFor(coords, distance) {

  }

})();
