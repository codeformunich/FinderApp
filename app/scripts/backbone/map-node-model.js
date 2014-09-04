'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var locationMath = require('location-math');
Backbone.$ = $;

module.exports = Backbone.Model.extend({

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
