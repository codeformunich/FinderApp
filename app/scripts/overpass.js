/**
 *  A module for working with the overpass api
 */
'use strict';

var $ = require('jquery');
var geoloc = require('./geoloc');

var overpassUrl = 'http://overpass-api.de/api/interpreter?' +
                  'data=[out:json][timeout:25];(';
var overpassOutputParams = ');out body;>;out skel qt;';
var callback;

function createBoundingBoxStr(position) {
  console.log(geoloc.getBoundingBoxFor(position, 1000));
  var boundingBox = geoloc.getBoundingBoxFor(position, 1000);

  return '(' + boundingBox.latMin + ',' + boundingBox.lonMin + ',' +
                boundingBox.latMax + ',' + boundingBox.lonMax + ')';
}

/**
 * Function to retrieve stuff from overpass. Query in the form of ["leisure"="playground"]
 */
function performRequest(currentPosition, query, cb) {
  callback = cb;

  var boundingBoxStr = createBoundingBoxStr(currentPosition);

  $.getJSON(overpassUrl + 'node' + query + boundingBoxStr + ';' + 'way' +
            query + boundingBoxStr + ';' + overpassOutputParams,
    function(data) {
      console.log(data);

      callback(data);
    });
}

exports.performRequest = performRequest;
