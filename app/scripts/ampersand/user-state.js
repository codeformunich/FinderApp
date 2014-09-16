'use strict';

var AmpersandState = require('ampersand-state');

module.exports = AmpersandState.extend({

  session: {
    position: 'object',
    targetId: 'number',
    watcherId: 'number'
  },

  locate: function(callback) {
    var _this = this;
    var positionFound = false;

    //clear old watchers
    if (this.watcherId) {
      navigator.geolocation.clearWatch(this.watcherId);
    }

    this.watcherId = navigator.geolocation.watchPosition(function(position) {
      console.log('Found position:');
      console.log(position.coords);
      _this.position = position;

      if (!positionFound) {
        callback(position);
        positionFound = true;
      }
    }, function(error) {
      console.log('Error: ' + error.message);
    }
    );
  }
});
