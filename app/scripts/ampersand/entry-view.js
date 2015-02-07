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
    'change input[type=tel]' : 'validatePostcode'
  },

  initialize: function() {
    this.title = app.config.titlePlural;
  },

  useLocation: function() {
    app.user.locate(app.user.processPosition);
  },

  usePostcode: function(ev) {
    ev.preventDefault();

    var postcode = $('input[name=postcode]').val();

    app.user.processPostcode(postcode);
  },

  validatePostcode: function(ev) {
    if ($(this.el).find('input[type=tel]')[0].checkValidity()) {
      console.log('test');
      $(this.el).find('button[type=submit]').show();
    } else {
      $(this.el).find('button[type=submit]').hide();
    }
  }
});
