define(['backbone', 'views/image'], function(Backbone, ImageView) {

  var ImageCollectionView = Backbone.View.extend({
    initialize: function(){
      this.listenTo(this.collection, "reset", this.render);
    },
    tagName: 'section',
    className: 'images',
    /*attributes: {
      draggable: true
    },*/
    render: function() {
      this.collection.each(function(image){
        var imageView = new ImageView({ model: image });
        this.$el.append(imageView.render().el);
      }, this);
      return this;
    }
  });
  return ImageCollectionView;

});
