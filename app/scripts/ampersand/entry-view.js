'use strict';

var $ = require('jquery');
var AmpersandView = require('ampersand-view');
var template = require('./templates/entry');

module.exports = AmpersandView.extend({
  template: template,

  events: {
    'click [data-action=locate]' : 'useLocation',
    'submit form' : 'usePostcode'
  },

  useLocation: function() {
    app.user.locate();
  },

  usePostcode: function(ev) {
    ev.preventDefault();

    var postcode = $('input[name=postcode]').val();

    app.user.processPostcode(postcode);
  }
});
