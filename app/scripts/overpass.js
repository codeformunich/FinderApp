/**
 *  A module for working with the overpass api
 */
var overpass = (function () {
  'use strict';

  var overpassUrl = 'http://overpass-api.de/api/interpreter?data=[out:json][timeout:25];';
  var overpassOutputParams = ';out body;>;out skel qt;';
  var callback;
  var query;

  function createBoundingBoxStr(position) {
      console.log(geoloc.getBoundingBoxFor(position.coords, 1000));
      var boundingBox = geoloc.getBoundingBoxFor(position.coords, 1000);

      return '(' + boundingBox.latMin + ',' + boundingBox.lonMin + ',' + boundingBox.latMax + ',' + boundingBox.lonMax + ')';
  }


  /**
   * Function to retrieve stuff from overpass. Query in the form of ["leisure"="playground"]
   */
  function getResults(qr, cb) {
    query = qr;
    callback = cb;

    navigator.geolocation.getCurrentPosition(performRequest);
  }

  function performRequest(position) {

    var boundingBoxStr = createBoundingBoxStr(position);

    $.getJSON(overpassUrl + '(node' + query + boundingBoxStr + ';);out body;>;out skel qt;',
      function( data ) {
        console.log(data);

        //TODO: preprocess elements
        if(data.elements) {
          callback(data.elements);
        }
    });
  }

  return {
    getResults: getResults
  };

})();
