'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var geoloc = require('../geoloc');
var MapNodeModel = require('./map-node-model');
Backbone.$ = $;

module.exports = Backbone.Collection.extend({
  model: MapNodeModel,

  parse: function(data) {
    var nodeArray = data.elements;

    for (var i = 0; i < nodeArray.length; i++) {

      if (nodeArray[i].type === 'way' && nodeArray[i].nodes) {
        nodeArray[i] = this.processWay(nodeArray[i], nodeArray);
      }
    }

    return nodeArray;
  },

  comparator: function(node) {
    return node.getDistance();
  },

  processWay: function(way, nodeArray) {
    way.nodeCoords = [];

    _.each(way.nodes, function(nodeId) {
      var wayNode = _.findWhere(nodeArray, {id: nodeId});

      if (wayNode) {
        way.nodeCoords.push(wayNode);
        var wayNodeIndex = nodeArray.indexOf(wayNode);
        nodeArray.splice(wayNodeIndex, 1);
      }
    });

    return _.extend(way, geoloc.getCentroid(way.nodeCoords));
  },

  removeDuplicates: function() {
    //always only compare to the next model as they are ordered by distance
    var duplicates = [];

    this.each(function(node1) {

      var currentDuplicates = this.filter(function(node2) {
        if (node1 === node2) {
          return false;
        } else {
          var dist = geoloc.getDistanceBetween(node1.toCoords(),
                                                node2.toCoords());
          return dist < 50;
        }
      });

      duplicates.push(currentDuplicates);

    }, this);

    this.remove(duplicates);
  }
});
