'use strict';

module.exports = {

  initialize: function() {
    app.user.on('change:targetId', function() {
      if (app.user.targetId) {
        this.showDetails();
      } else {
        this.showList();
      }
    }, this);
  },

  showList: function() {

  },

  showDetails: function() {
    //Find correct node
    var node = app.mapNodes.filter(function(node) {
      return node.osmId === app.user.targetId;
    })[0];

    app.mapView.showTarget(node);
    app.listView.showTarget(node);
  }
};
