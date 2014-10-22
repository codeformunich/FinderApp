//requires
'use strict';
var MapNodeCollection = require('./ampersand/map-node-collection');
var UserState = require('./ampersand/user-state');
var ListView = require('./ampersand/list-view');
var MapView = require('./ampersand/map-view');
var EntryView = require('./ampersand/entry-view');
var Router = require('./ampersand/router');
var controller = require('./ampersand/app-controller');
var menu = require('./vendor/menu');
var nominatim = require('./nominatim');
var nominatimQuery = 'spielplatz';

//The query that gets used with nominatim, for a full list:
// http://wiki.openstreetmap.org/wiki/Nominatim/Special_Phrases

menu.initialize();

module.exports = {

  blastoff: function() {
    window.app = this;
    app.user = new UserState();
    app.mapNodes = new MapNodeCollection();

    //instantiate the neccessary views
    app.entryView = new EntryView();
    app.mapView = new MapView({collection: app.mapNodes});
    app.listView = new ListView({collection: app.mapNodes});

    console.log(controller);

    app.controller = controller;

    controller.initialize();

    app.router = new Router();
    app.router.history.start({pushState: false});
    console.log('Blastoff!');
  },


  processPosition: function(position) {
    nominatim.performRequest({lat: position.coords.latitude,
                            lon: position.coords.longitude},
                            '[' + nominatimQuery + ']',
                            app.processNominatimResults);
  },

  processNominatimResults: function(nodesArray) {
    app.mapNodes.add(nodesArray);
    app.mapNodes.removeDuplicates();
    app.mapNodes.trigger('sync');
  }
};

module.exports.blastoff();
