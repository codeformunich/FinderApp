'use strict';

module.exports = {

  initialize: function() {

    app.user.on('change:showDetails', function() {
      if (app.user.showDetails) {
        this.showDetails();
      } else {
        this.showList();
      }
    }, this);

  },

  showList: function() {
    app.mapView.triggerDetails(false);
    app.listView.triggerDetails(false);

    app.router.navigate('/');
  },

  showDetails: function() {
    app.mapView.triggerDetails(true);
    app.listView.triggerDetails(true);
    console.log(app.user);
    app.router.navigate('/details');
  }
};
