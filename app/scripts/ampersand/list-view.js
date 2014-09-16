'use strict';

var $ = require('jquery');
var AmpersandView = require('ampersand-view');
var CardView = require('./card-view');
var template = require('./templates/list.hbs');

module.exports = AmpersandView.extend({
  template: template,

  initialize: function() {
    this.listenTo(app.user, 'change targetId', function() {
      if (app.user.targetId) {
        this.showFullScreen();
      }
    });
  },

  render: function() {
    this.renderWithTemplate();
    this.renderCollection(this.collection, CardView, this.el);

    return this;
  },

  showFullScreen: function() {
    this.el.classList.add('card-list--full');

    var node = this.collection.filter(function(node) {
      return node.osmId === app.user.targetId;
    })[0];
    var index = this.collection.indexOf(node);

    $(this.el).find('li').css('left', -85 * index + '%');
  }
});
