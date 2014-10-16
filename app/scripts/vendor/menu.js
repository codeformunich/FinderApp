'use strict';
var $ = require('jquery');

function initialize() {
  var menu = $('#navigation-menu');
  var menuToggle = $('#js-mobile-menu');
  $(menuToggle).on('click', function(e) {
    e.preventDefault();
    menu.slideToggle(function() {
      if (menu.is(':hidden')) {
        menu.removeAttr('style');
      }
    });
  });

 // underline under the active nav item
  $('.nav .nav-link').click(function() {
    $('.nav .nav-link').each(function() {
      $(this).removeClass('active-nav-item');
    });
    $(this).addClass('active-nav-item');
    $('.nav .more').removeClass('active-nav-item');
  });
}

module.exports = {
  initialize: initialize
};
