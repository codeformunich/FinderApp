'use strict';

var locationMath = require('location-math');
var MapNodeModel = require('./map-node-model');
var AmpersandCollection = require('ampersand-collection');

module.exports = AmpersandCollection.extend({
  model: MapNodeModel,

  initialize: function() {
    this.listenTo(app.user, 'change position', this.sort);
  },

  comparator: function(node) {
    node.distance = node.computeDistance();
    return node.distance;
  },

  removeDuplicates: function() {
    //always only compare to the next model as they are ordered by distance
    var duplicates = [];

    this.each(function(node1) {

      var currentDuplicates = this.filter(function(node2) {
        if (node1 === node2) {
          return false;
        } else {
          var dist = locationMath.getDistance(node1.toCoords(),
                                                node2.toCoords());
          return dist < 50;
        }
      });

      duplicates.push(currentDuplicates);

    }, this);

    this.remove(duplicates);
  }
});
