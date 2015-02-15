'use strict';

var $ = require('jquery');
var AmpersandView = require('ampersand-view');
var template = require('./templates/entry');

module.exports = AmpersandView.extend({
  template: template,
  title: 'Interessantes',

  events: {
    'click [data-action=locate]' : 'useLocation',
    'submit form' : 'usePostcode',
    'click input[type=tel]' : 'validatePostcode'
  },

  initialize: function() {
    this.title = app.config.titlePlural;
  },

  useLocation: function() {
    app.user.locate(app.user.processPosition);
  },

  usePostcode: function(ev) {
    ev.preventDefault();

    var $postcode = $('input[name=postcode]');

    var pattern = new RegExp($postcode.attr('pattern'));
    var postcode = $postcode.val();

    if (pattern.test($postcode.val())) {
      app.user.processPostcode(postcode);
    }
    //Todo: custom error message for mobile safari

  },

  validatePostcode: function(ev) {
    $(this.el).find('button[type=submit]').css('width', 140);
  }
});
