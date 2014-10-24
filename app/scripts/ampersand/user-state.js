'use strict';

var AmpersandState = require('ampersand-state');
var nominatim = require('../nominatim');

module.exports = AmpersandState.extend({

  session: {
    position: 'object',
    watcherId: 'number',
    showDetails: 'boolean'
  },

  locate: function() {
    var positionFound = false;

    //clear old watchers
    if (this.watcherId) {
      navigator.geolocation.clearWatch(this.watcherId);
    }

    this.trigger('showList');

    this.watcherId = navigator.geolocation.watchPosition(function(position) {
      console.log('Found position:');
      console.log(position.coords);
      app.user.position = position;

      if (!positionFound) {
        app.user.processPosition(position);
        positionFound = true;
      }
    }, function(error) {
      console.log('Error: ' + error.message);
    }
    );
  },

  processPosition: function(position) {
    nominatim.requestWithPosition(app.query,
                                        {lat: position.coords.latitude,
                                        lon: position.coords.longitude},
                                        app.user.processNominatimResults);
  },

  processPostcode: function(postcode) {
    this.trigger('showList');
    nominatim.requestWithPostcode(app.query, postcode,
                            app.user.processNominatimResults);

  },

  processNominatimResults: function(nodesArray) {
    console.log(nodesArray);
    app.mapNodes.reset(nodesArray);
    app.mapNodes.removeDuplicates();
    app.mapNodes.trigger('sync');
  }
});
