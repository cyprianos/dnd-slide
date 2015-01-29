define(['backbone', 'handlebars'], function(Backbone,Handlebars) {

  var ImageSlideView = Backbone.View.extend({
    render: function(){
      var template = $("#imageSlideTemplate").html();
      var compiled = Handlebars.compile(template);
      var html = compiled(this.model.attributes);
      this.$el.html(html);
      return this;
    }
  });

  return ImageSlideView;
})
