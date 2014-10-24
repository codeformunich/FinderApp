'use strict';

module.exports = {

  initialize: function() {
    app.user.on('showList', function() {
      this.showList();
    }, this);

    app.user.on('showDetails', function() {
      this.showDetails();
    }, this);
  },

  showEntry: function() {
    //instantiate the neccessary views
    app.pageSwitcher.set(app.entryView);
    app.router.navigate('/');
  },

  showList: function() {
    if (app.pageSwitcher.current !== app.resultView) {
      app.pageSwitcher.set(app.resultView);
    }

    app.resultView.showList();

    app.router.navigate('/list');
  },

  showDetails: function() {
    if (app.pageSwitcher.current !== app.resultView) {
      app.pageSwitcher.set(app.resultView);
    }

    app.resultView.showDetails();
    app.router.navigate('/details');
  }
};
