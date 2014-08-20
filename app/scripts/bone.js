Result = Backbone.Model.extend({

  toCoords: function(){
    return {lat: this.get('lat'), lon: this.get('lon')};
  }
});


ResultCollection = Backbone.Collection.extend({
  model: Result,

  parse: function(result) {
    var resultArray = result.elements;

    for(var i=0; i<resultArray.length; i++){
      if(resultArray[i].type = 'way') {
        resultArray[i] = this.processWay(resultArray[i], resultArray);
      }
    }

    return resultArray;
  },

  comparator: function(result) {
    if (currentPosition) {
      return geoloc.getDistanceBetween(currentPosition, result.toCoords());
    } else {
      return 0;
    }
  },

  processWay: function(way, resultArray) {
    _.each(way.nodes, function(nodeId) {
      var wayNode = _.findWhere(resultArray, {id: nodeId});
      //TODO: create center of way

      if(wayNode){
        way.lat = wayNode.lat;
        way.lon = wayNode.lon;
        wayNodeIndex = resultArray.indexOf(wayNode);
        resultArray.splice(wayNodeIndex, 1);
      }
    })

    console.log(resultArray.length);
    return way;
  }
})


ResultView = Backbone.View.extend({

      initialize: function(){
          this.render();
      },

      render: function(){
          // Compile the template using underscore
          var template = _.template( '<section class="card textcard">' +
                            '<h1><strong>Ein Spielplatz</strong></h1><h2>Yes! Another card!</h2>' +
                            '</section>', {} );
          // Load the compiled HTML into the Backbone "el"
          this.$el.html( template );
      }
  });
