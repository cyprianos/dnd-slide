define(["backbone", "events", "collections/image", "views/imagecollection", "views/imageslide"],
function(Backbone, Events, ImageCollection, ImageCollectionView, ImageSlideView){
  var Router = Backbone.Router.extend({
    
    initialize: function(){
      var self = this;
      this._setup();
      Events.on("router:navigate", function(url){
        self.navigate(url, {trigger:true});
      });
    },
    routes: {
      "": "index",
      "slide/:id": "slide"
    },

    _setup: function(){
      if(this.collection) return;
      var data = $("#initialContent").html();
      this.collection = new ImageCollection(JSON.parse(data))
    },
    _renderView: function(view) {
      $('.app').html(view.render().el);
    },

    index: function(){
      //this.collection.fetch({ reset:true });
      var view = new ImageCollectionView({ collection: this.collection });
      this._renderView(view);
    },
    slide: function(id) {
      var image = this.collection.get(id);
      var view = new ImageSlideView({ model:image});
      this._renderView(view);
    }

  });
  return Router;
});
    
