var Image = Backbone.Model.extend({
  idAttribute: "_id"
});

var ImageCollection = Backbone.Collection.extend({
  model: Image,
  url: "/images"
});

var ImageView = Backbone.View.extend({
  tagName: 'li',
  className: 'image',
  render: function() {
    this.$el.html("");
    var template = $("#imageTemplate").html(),
      compiled = Handlebars.compile(template),
      html = compiled(this.model.attributes);


    this.$el.html(html);
    return this;
  }
});

var ImageCollectionView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, "reset", this.render);
  },
  tagName: 'ul',
  className: 'images',
  render: function() {
    this.collection.each(function(image){
      var imageView = new ImageView({ model: image });
      this.$el.append(imageView.render().el);
    }, this);
    return this;
  }
});


var AppRouter = Backbone.Router.extend({
  routes: {
    "": "index",
    "slide/:id": "slide"
  },

  index: function(){
    var data = JSON.parse($("#initialContent").html());
    console.log('index');
    collection = new ImageCollection(data);
    //collection.fetch({ reset:true });
    var view = new ImageCollectionView({ collection: collection });
    $(".app").html(view.render().el);
  },
  slide: function(id) {
    
  }

});
