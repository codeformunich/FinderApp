'use strict';

var L = require('leaflet');

L.Icon.Deactivated = L.Icon.Default.extend({
  options: {
    iconUrl: 'images/leaflet/marker-icon_deact.png',
    iconRetinaUrl: 'images/leaflet/marker-icon_deact-2x.png'
  }
});

L.Control.Locate = L.Control.extend({
  initialize: function(options, clickFun, context) {
    L.Util.setOptions(this, options);
    this.clickFun = clickFun;
    this.context = context;
  },

  onAdd: function() {
    var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');

    this.link = L.DomUtil.create('a', 'leaflet-bar-part location-arrow',
      container);
    this.link.href = '#';
    L.DomEvent.on(this.link, 'click', this._click, this);
    this.link.title = this.options.title;

    return container;
  },

  clickFun: function() {
    alert('no function selected');
  },

  _click: function(e) {
    L.DomEvent.stopPropagation(e);
    L.DomEvent.preventDefault(e);
    this.clickFun.call(this.context);
  }
});
