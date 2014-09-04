'use strict';

var AmpersandModel = require('ampersand-model');
var locationMath = require('location-math');

module.exports = AmpersandModel.extend({

  props: {
    id: 'number',
    lat: 'number',
    lon: 'number',
    tags: 'object',
    type: 'string'
  },

  getDistance: function() {
    var positionVal = {
      lat: app.currentPosition.latitude,
      lon: app.currentPosition.longitude
    };
    return locationMath.getDistance(positionVal, this.toCoords());
  },

  toCoords: function() {
    return {lat: this.get('lat'), lon: this.get('lon')};
  }
});
