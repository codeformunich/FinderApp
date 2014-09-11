'use strict';

var AmpersandModel = require('ampersand-model');
var locationMath = require('location-math');

module.exports = AmpersandModel.extend({

  initialize: function() {
    this.distance = this.computeDistance();
  },

  props: {
    id: 'number',
    lat: 'number',
    lon: 'number',
    tags: 'object',
    type: 'string',
    distance: 'number',
  },

  computeDistance: function() {
    var positionVal = {
      lat: app.user.position.coords.latitude,
      lon: app.user.position.coords.longitude
    };
    var distance = locationMath.getDistance(positionVal, this.toCoords());
    return Math.round(distance);
  },

  toCoords: function() {
    return {lat: this.get('lat'), lon: this.get('lon')};
  }
});
