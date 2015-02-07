'use strict';

var $ = require('jquery');
var AmpersandView = require('ampersand-view');
var template = require('./templates/header');

module.exports = AmpersandView.extend({
  autoRender: true,
  template: template,

  events: {
    'click [data-action=about]' : 'showAbout',
    'click [data-action=show-menu]' : 'showMenu'
  },

  showMenu: function(e) {
    e.preventDefault();
    var menu = $('#navigation-menu');
    menu.slideToggle(function() {
      if (menu.is(':hidden')) {
        menu.removeAttr('style');
      }
    });
  },

  showAbout: function(e) {
    // Not needed as long as we have only one nav link
    // $('.nav .nav-link').each(function() {
    //   $(this).removeClass('active-nav-item');
    // });
    // $(this).addClass('active-nav-item');
    // $('.nav .more').removeClass('active-nav-item');
    this.showMenu(e);
    app.user.trigger('aboutPage', 'about');
  }
});
