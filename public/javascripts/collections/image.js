define(["backbone", "models/image"], function(Backbone, Image) {
  return  Backbone.Collection.extend({
    model: Image,
    url: "/images"
  });
});

 
