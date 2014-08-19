Result = Backbone.Model.extend({

  toCoords: function(){
    return {lat: this.get('lat'), lon: this.get('lon')};
  }
});


ResultCollection = Backbone.Collection.extend({
  model: Result,

  parse: function(result) {
    return result.elements;
  },

  comparator: function(result) {
    console.log(currentPosition);
    console.log(result.toCoords());
    console.log(geoloc.getDistanceBetween(currentPosition, result.toCoords()));
    if (currentPosition) {
      return geoloc.getDistanceBetween(currentPosition, result.toCoords());
    } else {
      return 0;
    }
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
