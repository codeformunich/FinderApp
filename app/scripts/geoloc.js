/**
 * A module for working with the geolocation
 */
'use strict';

var _ = require('underscore');

// Semi-axes of WGS-84 geoidal reference
var wgs84A = 6378137.0;
var wgs84B = 6356752.3;

function degToRad(deg) {
  return deg * (Math.PI / 180);
}

function radToDeg(rad) {
  return rad * (180 / Math.PI);
}

/**
 * Earth radius at a given latitude, according to the WGS-84 ellipsoid [m]
 * http://en.wikipedia.org/wiki/Earth_radius
 * @param {float} lat latitude for the earth radius
 */
function wgs84EarthRadius(lat) {

  var an = wgs84A * wgs84A * Math.cos(lat);
  var bn = wgs84B * wgs84B * Math.sin(lat);
  var ad = wgs84A * Math.cos(lat);
  var bd = wgs84B * Math.sin(lat);
  return Math.sqrt((an * an + bn * bn) / (ad * ad + bd * bd));
}

/**
 * Returns the distance between two spherical coordinates in meters
 * @param {Object} coords1
 * @param {Object} coords2
 */
function getDistanceBetween(coords1, coords2) {
  var earthRad = 6371;
  var lat1 = degToRad(coords1.lat);
  var lon1 = degToRad(coords1.lon);
  var lat2 = degToRad(coords2.lat);
  var lon2 = degToRad(coords2.lon);

  var dist = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) *
                      Math.cos(lat2) * Math.cos(lon1 - lon2)) * earthRad;

  return dist * 1000;
}

/**
 * Returns the bounding box for a given spherical coordinate and distance
 * @param {Object} coords  spherical coordinates for the mid point
 * @param {Float} distance distance of the bounding box edges in meters
 */
function getBoundingBoxFor(coords, distance) {
  var lat = degToRad(coords.lat);
  var lon = degToRad(coords.lon);

  // Radius of Earth at given latitude
  var radius = wgs84EarthRadius(lat);
  // Radius of the parallel at given latitude
  var pradius = radius * Math.cos(lat);
  var result = {};

  result.latMin = radToDeg(lat - distance / radius);
  result.latMax = radToDeg(lat + distance / radius);
  result.lonMin = radToDeg(lon - distance / pradius);
  result.lonMax = radToDeg(lon + distance / pradius);

  return result;
}

/**
 * Converts spherical to cartesian coordinates
 * @param {Object} coords
 */
function convertToCartesian(coords) {
  var lat = degToRad(coords.lat);
  var lon = degToRad(coords.lon);

  var x = Math.cos(lat) * Math.cos(lon);
  var y = Math.cos(lat) * Math.sin(lon);
  var z = Math.sin(lat);

  return {x: x, y: y, z: z};
}

/**
 * Sums up cartesian coordiantes
 * @param {Object} cartesianSum  current sum of the coordinates
 * @param {Object} sphericalCoords spherical coordinates to add
 */
function sumCartesianCoords(cartesianSum, sphericalCoords) {
  var cartesianCoords = convertToCartesian(sphericalCoords);

  return {
    x: cartesianSum.x + cartesianCoords.x,
    y: cartesianSum.y + cartesianCoords.y,
    z: cartesianSum.z + cartesianCoords.z
  };
}

/**
 * Converts cartesian to spherical coordiantes
 * @param {Object} cartesianCoords object with lat and lon properties
 */
function convertToSpherical(cartesianCoords) {
  var hyp = Math.sqrt(cartesianCoords.x * cartesianCoords.x +
                      cartesianCoords.y * cartesianCoords.y);

  return {
    lat: Math.atan2(cartesianCoords.z, hyp),
    lon: Math.atan2(cartesianCoords.y, cartesianCoords.x)
  };
}

/**
 * get the centroid of a given array of coordinates
 * @param {Object} coordsArr an arrat of Objects with cartesian coordinates
 */
function getCentroid(coordsArr) {
  var cartesianSum = _.reduce(coordsArr, sumCartesianCoords, {x:0, y:0, z:0});

  var center = convertToSpherical({
    x: cartesianSum.x / coordsArr.length,
    y: cartesianSum.y / coordsArr.length,
    z: cartesianSum.z / coordsArr.length
  });

  return {
    lat: radToDeg(center.lat),
    lon: radToDeg(center.lon)
  };
}

exports.getDistanceBetween = getDistanceBetween;
exports.getBoundingBoxFor = getBoundingBoxFor;
exports.getCentroid = getCentroid;
