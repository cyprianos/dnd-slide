define(['backbone'], function(Backbone){
  return Backbone.Model.extend({
    initialize: function() {
      var min = 0,
        maxHeight = window.innerHeight-150,
        maxWidth = window.innerWidth-150,
        width = this.randomize(min,maxWidth),
        height = this.randomize(min, maxHeight);

      this.set('position', {
        x: width,
        y: height
      });
    },
    randomize: function(min,max) {
      var random = Math.floor(Math.random() * (max-min+1))+ min;
      return random;
    },
    idAttribute: "_id"
  });
})
