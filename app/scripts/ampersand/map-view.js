'use strict';

var L = require('leaflet');
L.Icon.Default.imagePath = '/images/leaflet';
var AmpersandView = require('ampersand-view');
var template = require('./templates/map');

var apikey = 'a5fdf236c7fb42d794a43e94be030fb2';

module.exports = AmpersandView.extend({
  autoRender: true,
  template: template,

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.addMarkers);
    this.listenTo(app.user, 'change position', this.setUserPosition);
    this.listenTo(app.user, 'change targetId', function() {
      if (app.user.targetId) {
        this.showTarget();
      }
    });
  },

  render: function() {
    this.renderWithTemplate();
  },

  renderMap: function() {
    this.map = L.map(this.queryByHook('map'), {zoomControl: false});
    new L.Control.Zoom({position: 'bottomright'}).addTo(this.map);
    var tp;

    if (L.Browser.retina) {
      tp = 'lr';
    }
    else {
      tp = 'ls';
    }

    L.tileLayer('http://tiles.lyrk.org/' + tp + '/{z}/{x}/{y}?apikey=' + apikey,
     {
       attribution: '<a href="http://leafletjs.com" title="A JS library for ' +
                    'interactive maps">Leaflet</a> | Data: ' +
                    '<a href="http://www.overpass-api.de/">OverpassAPI</a>' +
                    ' OpenStreetMap | <a href="http://geodienste.lyrk.de/" ' +
                    'target="_blank">Tiles by Lyrk</a> | <a href="http://' +
                    'geodienste.lyrk.de/copyright">Lizenzinformationen</a>' +
                    '</div>',
       maxZoom: 18
     }).addTo(this.map);

    this.map.on('locationfound', this.setUserPosition, this);
    this.map.locate({setView: true, maxZoom: 16});
  },

  addMarkers: function(e) {
    this.collection.each(function(mapNode, index) {
      this.addMarker(mapNode.toCoords());
    }, this);
  },

  addMarker: function(coords, markerOptions)  {
    var options = markerOptions || {};
    var marker;

    if (options.circle === true) {
      marker = L.circleMarker([coords.lat, coords.lon]);
    } else {
      marker = L.marker([coords.lat, coords.lon]);
    }

    marker.addTo(this.map);

    if (options.popupText) {
      marker.bindPopup(options.popupText);
    }
  },

  setUserPosition: function() {
    if (app.user.position) {
      var coords = app.user.position.coords;

      // For now update accuracy but do not reset view
      // this.map.setView([coords.latitude, coords.longitude]);

      var rad = coords.accuracy / 2;

      if (this.posMarker) {
        this.map.removeLayer(this.posMarker);
      }

      this.posMarker = new L.Circle([coords.latitude, coords.longitude], rad);
      this.map.addLayer(this.posMarker);
    }
  },

  showTarget: function() {
    var paddingTop = 155;
    var paddingBottom = 10;

    this.el.classList.add('map-card--full');
    this.map.invalidateSize(true);

    //centerOnTargetNode
    var node = this.collection.filter(function(node) {
      return node.osmId === app.user.targetId;
    })[0];

    var mapBounds = new L.LatLngBounds([[node.lat, node.lon],
      [app.user.position.coords.latitude, app.user.position.coords.longitude]]);

    this.map.fitBounds(mapBounds, {
      animate: true,
      paddingTopLeft: [0, paddingTop],
      paddingBottomRight: [0, paddingBottom],
    });
  }
});
