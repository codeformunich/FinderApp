(function () {
  'use strict';

  var overpassUrl = 'http://overpass-api.de/api/interpreter?data=[out:json][timeout:25];';
  var overpassOutputParams = ';out body;>;out skel qt;';
  var map;

  initializeMap();
  getLocation();


  function initializeMap() {
    map = L.map('map');
    L.tileLayer('http://{s}.tiles.mapbox.com/v3/jancborchardt.j7aheln6/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(map);

    map.locate({setView: true, maxZoom: 16});
  }

  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(usePosition);
      } else {
          alert('Geolocation is not supported by this browser.');
      }
  }

  function usePosition(position) {
      console.log('Latitude: ' + position.coords.latitude + ' Longitude: ' + position.coords.longitude);
      console.log('Distance: ' + getDistanceBetween(position.coords, position.coords));
      console.log(getBoundingBoxFor(position.coords, 1000));

      var boundingBox = getBoundingBoxFor(position.coords, 1000)

      var boundingBoxStr = '(' + boundingBox.latMin + ',' + boundingBox.lonMin + ',' + boundingBox.latMax + ',' + boundingBox.lonMax + ')'

      $.getJSON(overpassUrl + '(node["leisure"="playground"]' + boundingBoxStr + ';);out body;>;out skel qt;',

      function( data ) {
        console.log(data);

        if(data.elements) {
          for(var i=0; i< data.elements.length; i++) {
            L.marker([data.elements[i].lat, data.elements[i].lon])
              .addTo(map).bindPopup('Spielplatz #' + i);


            $('main').append('<section class="card textcard">' +
                              '<h1><strong>Ein Spielplatz</strong></h1><h2>Yes! Another card!</h2>' +
                              '</section>')
          }
        }

      });
  }


  function degToRad(deg) {
    return deg * (Math.PI/180);
  }

  function radToDeg(rad) {
    return rad * (180/Math.PI);
  }


  //dist = arccos(sin(lat1) · sin(lat2) + cos(lat1) · cos(lat2) · cos(lon1 - lon2)) · R
  function getDistanceBetween(coords1, coords2) {
    var earthRad = 6371,
        lat1 = degToRad(coords1.latitude),
        lon1 = degToRad(coords1.longitude),
        lat2 = degToRad(coords2.latitude),
        lon2 = degToRad(coords2.longitude);

    var dist = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2)) * earthRad;

    return dist;
  }


  //Earth radius at a given latitude, according to the WGS-84 ellipsoid [m]
  //http://en.wikipedia.org/wiki/Earth_radius
  function wgs84EarthRadius(lat){
    // Semi-axes of WGS-84 geoidal reference
    var wgs84_a = 6378137.0,
        wgs84_b = 6356752.3;

    var an = wgs84_a*wgs84_a * Math.cos(lat);
    var bn = wgs84_b*wgs84_b * Math.sin(lat);
    var ad = wgs84_a * Math.cos(lat);
    var bd = wgs84_b * Math.sin(lat);
    return Math.sqrt((an*an + bn*bn)/(ad*ad + bd*bd));
  }


  function getBoundingBoxFor(coords, distance) {
    var lat = degToRad(coords.latitude),
        lon = degToRad(coords.longitude);


    // Radius of Earth at given latitude
    var radius = wgs84EarthRadius(lat);
    // Radius of the parallel at given latitude
    var pradius = radius*Math.cos(lat);

    var result = {};

    result.latMin = radToDeg(lat - distance/radius);
    result.latMax = radToDeg(lat + distance/radius);
    result.lonMin = radToDeg(lon - distance/pradius);
    result.lonMax = radToDeg(lon + distance/pradius);

    return result;
  }

})();
