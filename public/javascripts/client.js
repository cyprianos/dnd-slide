var Image = Backbone.Model.extend({
  idAttribute: "_id"
});

ImageCollection = Backbone.Collection.extend({
  model: Image,
  url: "/images"
});
