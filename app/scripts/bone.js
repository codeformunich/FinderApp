Result = Backbone.Model.extend({

  getDistance: function(){
    return geoloc.getDistanceBetween(currentPosition, this.toCoords());
  },

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
    return result.getDistance();
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
  },

  removeDuplicates: function() {
    //always only compare to the next model as they are ordered by distance

    this.each(function(result1) {

      var duplicates = this.filter(function(result2){
        if(result1 === result2){
          return false;
        } else {
          var dist = geoloc.getDistanceBetween(result1.toCoords(), result2.toCoords());
          return dist < 50;
        }
      });

      this.remove(duplicates);
    }, this);

    console.log(this);
  }
})


ResultView = Backbone.View.extend({

      initialize: function(){
          this.render();
      },

      render: function(){
          // Compile the template using underscore
          var template = _.template( '<section class="card textcard">' +
                            '<h1><strong>Ein Spielplatz</strong></h1>'+
                            '<h2>Entfernung: <%= Math.round(result.getDistance()) %> m</h2>' +
                            '</section>', {result: this.model} );
          // Load the compiled HTML into the Backbone "el"
          this.$el.html( template );
      }
  });
