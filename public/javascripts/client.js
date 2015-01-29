var Image = Backbone.Model.extend({
  idAttribute: "_id"
});

var ImageCollection = Backbone.Collection.extend({
  model: Image,
  url: "/images"
});

var ImageView = Backbone.View.extend({
  events: {
    'click .name': 'showSlide'
  },
  tagName: 'li',
  className: 'image',
  render: function() {
    this.$el.html("");
    var template = $("#imageTemplate").html(),
      compiled = Handlebars.compile(template),
      html = compiled(this.model.attributes);


    this.$el.html(html);
    return this;
  },
  showSlide: function(e) {
    e.preventDefault();
    var id = this.model.get('_id');
    router.navigate('slide/' + id, {trigger:true});
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

var ImageSlideTemplate = Backbone.View.extend({
  render: function(){
    var template = $("#imageSlideTemplate").html();
    var compiled = Handlebars.compile(template);
    var html = compiled(this.model.attributes);
    this.$el.html(html);
    return this;
  }
});


var AppRouter = Backbone.Router.extend({
  
  initialize: function(){
    this._setup();
  },
  routes: {
    "": "index",
    "slide/:id": "slide"
  },

  _setup: function(){
    var data = $("#initialContent").html();
    if(this.collection) return;
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
    var view = new ImageSlideTemplate({ model:image});
    this._renderView(view);
  }

});
