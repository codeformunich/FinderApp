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

    app.listView.triggerDetails(false);
    app.mapView.triggerDetails(false);

    app.router.navigate('/');
  },

  showDetails: function() {
    //Always trigger list before map so that body has the correct size;
    app.listView.triggerDetails(true);
    app.mapView.triggerDetails(true);
    console.log(app.user);
    app.router.navigate('/details');
  }
};
