'use strict';

var $ = require('jquery');

module.exports = {

  initialize: function() {

    app.user.on('change:showDetails', function() {
      if (app.user.showDetails) {
        this.showDetails();
      } else {
        this.showList();
      }
    }, this);

    app.user.on('change:position', function() {
      if (app.user.position) {
        this.showList();
      } else {
        this.showEntry();
      }
    }, this);

  },

  showEntry: function() {
    app.mapView.remove();
    app.listView.remove();
    //instantiate the neccessary views
    $('main').addClass('entry-wrapper');
    app.entryView.render();
    $('main').append(app.entryView.el);
    app.listView.render();
    app.router.navigate('/');
  },

  showList: function() {

    $('main').removeClass('entry-wrapper');
    app.entryView.remove();

    app.mapView.render();
    $('main').append(app.mapView.el);
    app.listView.render();
    $('main').append(app.listView.el);

    app.listView.triggerDetails(false);
    app.mapView.triggerDetails(false);

    app.router.navigate('/list');
  },

  showDetails: function() {
    app.entryView.remove();
    //Always trigger list before map so that body has the correct size;

    if (!window.matchMedia('(min-width:860px)').matches) {
      app.listView.triggerDetails(true);
      app.mapView.triggerDetails(true);
    }

    console.log(app.user);
    app.router.navigate('/details');
  }
};
