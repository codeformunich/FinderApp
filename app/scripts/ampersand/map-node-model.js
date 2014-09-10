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

  derived: {
    distance: {
      deps: ['lat', 'lon'],
      cache: false,
      fn: function() {
        var positionVal = {
          lat: app.currentPosition.latitude,
          lon: app.currentPosition.longitude
        };
        var distance = locationMath.getDistance(positionVal, this.toCoords());
        return Math.round(distance);
      }
    }
  },

  toCoords: function() {
    return {lat: this.get('lat'), lon: this.get('lon')};
  }
});
