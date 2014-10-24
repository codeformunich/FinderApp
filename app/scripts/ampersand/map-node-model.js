'use strict';

var AmpersandModel = require('ampersand-model');
var locationMath = require('location-math');

module.exports = AmpersandModel.extend({

  initialize: function() {
    this.distance = this.computeDistance();
    if (!this.address.road) {
      if (this.address.path) {
        this.address.road = this.address.path;
      } else if (this.address.street) {
        this.address.road = this.address.street;
      } else if (this.address.footway) {
        this.address.road = this.address.footway;
      } else if (this.address.address27) {
        this.address.road = this.address.address27;
      } else {
        this.address.road = this.address.hamlet;
      }
    }
  },

  props: {
    osmId: 'number',
    lat: 'number',
    lon: 'number',
    tags: 'object',
    address: 'object',
    osmType: 'string',
    distance: 'number',
  },

  computeDistance: function() {
    if (app.user.position) {
      var positionVal = {
        lat: app.user.position.coords.latitude,
        lon: app.user.position.coords.longitude
      };
      var distance = locationMath.getDistance(positionVal, this.toCoords());
      return Math.round(distance);
    } else {
      return null;
    }
  },

  toCoords: function() {
    return {lat: this.get('lat'), lon: this.get('lon')};
  }
});
