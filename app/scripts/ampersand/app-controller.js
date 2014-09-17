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
    app.router.navigate('/')
  },

  showDetails: function() {
    app.mapView.showDetails();
    app.listView.showDetails();
    console.log(app.user);
    app.router.navigate('/details');
  }
};
