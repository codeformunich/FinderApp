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
    'click input[type=tel]' : 'showButton'
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

    var pattern = /^[0-9]{5}$/;
    var postcode = $postcode.val();

    if (postcode.match(pattern)) {
      app.user.processPostcode(postcode);
    } else {
      var $error = $(this.queryByHook('postcode-error'));
      $error.text('Bitte gültige Postleitzahl angeben.');
      $error.css('display', 'block');
    }

  },

  showButton: function(ev) {
    $(this.el).find('button[type=submit]').css({
      'width': 140,
      'margin-left': 10
    });
  }
});
