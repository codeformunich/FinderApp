//requires
'use strict';

var ViewSwitcher = require('ampersand-view-switcher');
var MapNodeCollection = require('./ampersand/map-node-collection');
var UserState = require('./ampersand/user-state');
var EntryView = require('./ampersand/entry-view');
var ResultView = require('./ampersand/result-view');
var HeaderView = require('./ampersand/header-view');
var Router = require('./ampersand/router');
var controller = require('./ampersand/app-controller');
var $ = require('jquery');

module.exports = {

  blastoff: function() {
    window.app = this;

    app.config = {
		//singular title used for the app
      title: 'Spielplatz',
		//plural title used for the app
      titlePlural: 'Spielplätze',
      overpass: {
			//query from http://wiki.openstreetmap.org/wiki/Nominatim/Special_Phrases/DE
        query: 'Spielplatz',
			//option within returned data to display as single entity's headline
        headline: 'playground'
      },
      map: {
			//position of zoom buttons on map
        zoomPosition: 'bottomleft',
			//position of "locate me" button on map
        locatemePosition: 'bottomleft',
			//title text of "locate me" button
        locatemeTitle: 'Meine Position'
      }
    };

    app.user = new UserState();
    app.mapNodes = new MapNodeCollection();

    //instantiate the neccessary views
    app.headerView = new HeaderView();
    app.entryView = new EntryView();
    app.resultView = new ResultView({collection: app.mapNodes});

    app.controller = controller;

    $('header').append(app.headerView.el);

    app.pageSwitcher = new ViewSwitcher(document.querySelector('main'), {
      show: function(newView, oldView) {
        // it's inserted and rendered for me
        document.title = newView.pageTitle || app.config.title + 'finder';
        document.body.scrollTop = 0;
      }
    });

    controller.initialize();

    app.router = new Router();
    app.router.history.start({pushState: false});
    console.log('Blastoff!');
  },
};

module.exports.blastoff();
