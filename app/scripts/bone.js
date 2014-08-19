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
