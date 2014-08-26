/**
 * A module for working with the geolocation
 */
'use strict';

var _ = require('underscore');


// Semi-axes of WGS-84 geoidal reference
var wgs84A = 6378137.0,
    wgs84B = 6356752.3;


function degToRad(deg) {
  return deg * (Math.PI/180);
}


function radToDeg(rad) {
  return rad * (180/Math.PI);
}


//Earth radius at a given latitude, according to the WGS-84 ellipsoid [m]
//http://en.wikipedia.org/wiki/Earth_radius
function wgs84EarthRadius(lat){

  var an = wgs84A*wgs84A * Math.cos(lat);
  var bn = wgs84B*wgs84B * Math.sin(lat);
  var ad = wgs84A * Math.cos(lat);
  var bd = wgs84B * Math.sin(lat);
  return Math.sqrt((an*an + bn*bn)/(ad*ad + bd*bd));
}


function getDistanceBetween(coords1, coords2) {
  var earthRad = 6371,
      lat1 = degToRad(coords1.lat),
      lon1 = degToRad(coords1.lon),
      lat2 = degToRad(coords2.lat),
      lon2 = degToRad(coords2.lon);

  var dist = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2)) * earthRad;

  return dist * 1000;
}


function getBoundingBoxFor(coords, distance) {

  var lat = degToRad(coords.lat),
      lon = degToRad(coords.lon);

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


function convertToCart(coords) {
  var lat = degToRad(coords.lat);
  var lon = degToRad(coords.lon);

  var x = Math.cos(lat) * Math.cos(lon);
  var y = Math.cos(lat) * Math.sin(lon);
  var z = Math.sin(lat);

  return {x: x, y: y, z: z};
}


function sumCartCoords(cartSum, sphericalCoords) {
  console.log(sphericalCoords);
  var cartCoords = convertToCart(sphericalCoords);

  return {
    x: cartSum.x + cartCoords.x,
    y: cartSum.y + cartCoords.y,
    z: cartSum.z + cartCoords.z
  };
}


function convertToSpherical(cartCoords) {
  var hyp = Math.sqrt(cartCoords.x * cartCoords.x + cartCoords.y * cartCoords.y);

  return {
    lat: Math.atan2(cartCoords.z, hyp),
    lon: Math.atan2(cartCoords.y, cartCoords.x)
  };
}


/**
 * Compute the center for a given array of coordinates
 */
function getCentroid(coordsArr) {
  var cartSum = _.reduce(coordsArr, sumCartCoords, {x:0, y:0, z:0});

  var center = convertToSpherical({
    x: cartSum.x / coordsArr.length,
    y: cartSum.y / coordsArr.length,
    z: cartSum.z / coordsArr.length
  });

  return {
    lat: radToDeg(center.lat),
    lon: radToDeg(center.lon)
  };
}


module.exports = {
  getDistanceBetween: getDistanceBetween,
  getBoundingBoxFor: getBoundingBoxFor,
  getCentroid: getCentroid
};
