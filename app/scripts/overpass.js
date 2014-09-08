/**
 *  A module for working with the overpass api
 */
'use strict';

var $ = require('jquery');
var locationMath = require('location-math');
var _ = require('underscore');

var overpassUrl = 'http://overpass-api.de/api/interpreter?' +
                  'data=[out:json][timeout:25];(';
var overpassOutputParams = ');out body;>;out skel qt;';
var callback;

function createBoundingBoxStr(position) {
  console.log(locationMath.getBoundingBox(position, 1000));
  var boundingBox = locationMath.getBoundingBox(position, 1000);

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
      parse(data);
    });
}

function parse(data) {
  var nodeArray = data.elements;

  for (var i = 0; i < nodeArray.length; i++) {

    if (nodeArray[i].type === 'way' && nodeArray[i].nodes) {
      nodeArray[i] = processWay(nodeArray[i], nodeArray);
    }
  }

  callback(nodeArray);
}

function processWay(way, nodeArray) {
  way.nodeCoords = [];

  _.each(way.nodes, function(nodeId) {
    var wayNode = _.findWhere(nodeArray, {id: nodeId});

    if (wayNode) {
      way.nodeCoords.push(wayNode);
      var wayNodeIndex = nodeArray.indexOf(wayNode);
      nodeArray.splice(wayNodeIndex, 1);
    }
  });

  return _.extend(way, locationMath.getCentroid(way.nodeCoords));
}

exports.performRequest = performRequest;
