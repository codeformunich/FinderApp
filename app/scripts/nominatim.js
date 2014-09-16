/**
 *  A module for working with the overpass api
 */
'use strict';

var $ = require('jquery');
var locationMath = require('location-math');
var nominatimUrl = 'http://nominatim.openstreetmap.org/search?';
var nominatimParams = {
  bounded: 1,
  format: 'json',
  polygon: 0,
  limit: 15,
  addressdetails: 1
};
var callback;

function createBoundingBoxStr(position) {
  console.log(locationMath.getBoundingBox(position, 1000));
  var boundingBox = locationMath.getBoundingBox(position, 1000);

  return boundingBox.lonMin + ',' + boundingBox.latMin + ',' +
                boundingBox.lonMax + ',' + boundingBox.latMax;
}

/**
 * Function to retrieve stuff from overpass. Query in the form of ["leisure"="playground"]
 */
function performRequest(currentPosition, query, cb) {
  callback = cb;

  nominatimParams.q = query;
  nominatimParams.viewbox = createBoundingBoxStr(currentPosition);
  var urlStr = nominatimUrl + decodeURIComponent($.param(nominatimParams));
  console.log(urlStr);
  $.getJSON(urlStr,
    function(data) {
      data = parse(data);
      callback(parse(data));
      //parse(data);
    });
}

function parse(data) {
  for (var i = 0; i < data.length; i++) {
    data[i].osmId = parseFloat(data[i].osm_id);
    data[i].osmType = data[i].osm_type;
    data[i].lat = parseFloat(data[i].lat);
    data[i].lon = parseFloat(data[i].lon);
  }

  return data;
}


exports.performRequest = performRequest;
