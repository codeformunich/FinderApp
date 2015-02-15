'use strict';

var AmpersandModel = require('ampersand-model');
var locationMath = require('location-math');

module.exports = AmpersandModel.extend({

  initialize: function() {
    this.distance = this.computeDistance();
    this.distanceText = this.createDistanceText(this.distance);
    this.name = this.address[app.config.overpass.headline] || null;
    this.query = app.config.overpass.query;

    if (!this.address.road) {
      if (this.address.path) {
        this.address.road = this.address.path;
      } else if (this.address.street) {
        this.address.road = this.address.street;
      } else if (this.address.footway) {
        this.address.road = this.address.footway;
      } else if (this.address.address27) {
        this.address.road = this.address.address27;
      } else if (this.address.cycleway) {
        this.address.road = this.address.cycleway;
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

  createDistanceText: function(distance) {
    if (distance) {
      return distance + 'm';
    } else {
      return '-';
    }
  },

  toCoords: function() {
    return {lat: this.get('lat'), lon: this.get('lon')};
  }
});
