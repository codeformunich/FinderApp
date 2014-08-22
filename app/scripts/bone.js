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
      if(resultArray[i].type === 'way' && resultArray[i].nodes) {
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
    way.nodeCoords = [];

    _.each(way.nodes, function(nodeId) {
      var wayNode = _.findWhere(resultArray, {id: nodeId});

      if(wayNode) {
        way.nodeCoords.push(wayNode);
        wayNodeIndex = resultArray.indexOf(wayNode);
        resultArray.splice(wayNodeIndex, 1);
      }
    })

    return _.extend(way, geoloc.getCenterFor(way.nodeCoords));
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
