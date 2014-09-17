//requires
'use strict';
var $ = require('jquery');
var MapNodeCollection = require('./ampersand/map-node-collection');
var UserState = require('./ampersand/user-state');
var ListView = require('./ampersand/list-view');
var MapView = require('./ampersand/map-view');
var Router = require('./ampersand/router');
var mediator = require('./ampersand/app-mediator');
var nominatim = require('./nominatim');
var starterkit = require('./vendor/starterkit');

starterkit.initialize();

module.exports = {

  blastoff: function() {
    window.app = this;
    app.user = new UserState();
    app.mapNodes = new MapNodeCollection();

    this.user.locate(this.processPosition);

    //instantiate the neccessary views
    app.mapView = new MapView({collection: app.mapNodes});
    $('main').append(app.mapView.el);
    app.mapView.renderMap();
    app.listView = new ListView({collection: app.mapNodes});
    app.listView.render();

    app.router = new Router();
    app.router.history.start({pushState: false, root: '/'});
    mediator.initialize();

    console.log('Blastoff!');
  },

  processPosition: function(position) {
    nominatim.performRequest({lat: position.coords.latitude,
                            lon: position.coords.longitude},
                            '[spielplatz]',
                            app.processNominatimResults);
  },

  processNominatimResults: function(nodesArray) {
    app.mapNodes.add(nodesArray);
    app.mapNodes.removeDuplicates();
    app.mapNodes.trigger('sync');
    $('main').append(app.listView.el);
  }
};

module.exports.blastoff();
