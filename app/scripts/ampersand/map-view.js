'use strict';

var L = require('leaflet');
require('../leaflet-config');
var $ = require('jquery');
L.Icon.Default.imagePath = 'images/leaflet';
var AmpersandView = require('ampersand-view');
var template = require('./templates/map');
var apikey = 'a5fdf236c7fb42d794a43e94be030fb2';

module.exports = AmpersandView.extend({
  autoRender: true,
  template: template,

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.addMarkers);
    this.listenTo(app.user, 'change:position', this.setUserPosition);
    this.listenTo(this.collection, 'change:selectedNode', function() {
      if (this.collection.length) {
        this.addMarkers();
      }
      if (this.collection.selectedNode) {
        L.Util.requestAnimFrame(this.showSelected, this,
          false, this.map._container);
      }
    });

    //TODO: Maybe move into config

    var _this = this;
    this.locateControl = new L.Control.Locate(
      {
        position: 'bottomleft',
        title: 'Meine Position'
      },
      function() {
        if (app.user.position) {
          var coords = app.user.position.coords;
          this.map.setView([coords.latitude, coords.longitude]);
        } else {
          app.user.locate(function() {
            _this.map.setView([app.user.position.coords.latitude,
            app.user.position.coords.longitude]);
          });
        }
      }, this
    );
  },

  render: function() {
    this.renderWithTemplate();

    this.map = L.map(this.queryByHook('map'), {zoomControl: false});
    new L.Control.Zoom({position: 'bottomleft'}).addTo(this.map);
    var tp;

    if (L.Browser.retina) {
      tp = 'lr';
    }
    else {
      tp = 'ls';
    }

    L.tileLayer('http://tiles.lyrk.org/' + tp + '/{z}/{x}/{y}?apikey=' + apikey,
     {
       attribution: '| Data: ' +
                    '<a href="http://www.overpass-api.de/">OverpassAPI</a>' +
                    ' OpenStreetMap | <a href="http://geodienste.lyrk.de/" ' +
                    'target="_blank">Tiles by Lyrk</a> | <a href="http://' +
                    'geodienste.lyrk.de/copyright">Lizenz</a>' +
                    '</div>',
       maxZoom: 16
     }).addTo(this.map);

    this.setUserPosition();
    this.map.addControl(this.locateControl);
  },

  addMarkers: function(e) {
    if (this.markers) {
      this.map.removeLayer(this.markers);
    }

    this.markers = new L.FeatureGroup();
    this.map.addLayer(this.markers);

    this.collection.each(function(mapNode, index) {
      if (this.collection.selectedNode) {
        if (mapNode === this.collection.selectedNode) {
          this.addMarker(mapNode);
        } else {
          this.addMarker(mapNode, {deactivated: true});
        }
      } else {
        this.addMarker(mapNode);
      }

    }, this);

    if (!this.collection.selectedNode) {
      this.map.fitBounds(this.markers.getBounds());
    }
  },

  addMarker: function(mapNode, markerOptions)  {
    var options = markerOptions || {};
    var marker;
    var coords = mapNode.toCoords();

    if (options.deactivated === true) {
      marker = L.marker([coords.lat, coords.lon],
        {icon: new L.Icon.Deactivated()});
    } else {
      marker = L.marker([coords.lat, coords.lon]);
    }

    marker.addTo(this.markers);

    marker.on('click', function() {
      app.mapNodes.selectNode(mapNode);
    });

    if (options.popupText) {
      marker.bindPopup(options.popupText);
    }
  },

  setUserPosition: function() {
    var position = app.user.position;
    console.log(position);
    if (position) {
      var latlon = [position.coords.latitude, position.coords.longitude];
      var rad = position.coords.accuracy;

      if (this.accMarker) {
        this.map.removeLayer(this.accMarker);
        this.map.removeLayer(this.posMarker);
      }

      this.accMarker = new L.Circle(latlon, rad).addTo(this.map);
      this.posMarker = new L.circleMarker(latlon,
        {opacity: 1, radius: 5, fillOpacity: 0.9}).addTo(this.map);
    }
  },

  triggerDetails: function(showDetails) {
    if (showDetails) {
      this.el.classList.add('map-card--full');
      this.map.dragging.enable();
      this.map.touchZoom.enable();
      this.map.doubleClickZoom.enable();
      this.map.scrollWheelZoom.enable();
      $('.leaflet-control-zoom, .location-arrow').show();
    } else {
      this.el.classList.remove('map-card--full');
      this.map.dragging.disable();
      this.map.touchZoom.disable();
      this.map.doubleClickZoom.disable();
      this.map.scrollWheelZoom.disable();
      $('.leaflet-control-zoom, .location-arrow').hide();
    }

    L.Util.requestAnimFrame(this.map.invalidateSize, this.map,
      false, this.map._container);
  },

  showSelected: function() {
    var selectedNode = this.collection.selectedNode;

    if (app.user.position) {
      var mapBounds = new L.LatLngBounds([[selectedNode.lat, selectedNode.lon],
      [app.user.position.coords.latitude, app.user.position.coords.longitude]]);

      if (!window.matchMedia('(min-width:860px)').matches) {
        this.map.fitBounds(mapBounds, {
          animate: true,
          paddingTopLeft: [10, 145],
          paddingBottomRight: [10, 80]
        });
      } else {
        this.map.fitBounds(mapBounds, {
          animate: true,
          paddingTopLeft: [10, 60],
          paddingBottomRight: [260, 80]
        });
      }
    } else {
      this.map.setView([selectedNode.lat, selectedNode.lon]);
    }
  }
});
