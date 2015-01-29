define(['backbone','handlebars','jquery','events'], function(Backbone,Handlebars, $, Events) {

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
      var url = "slide/" + id;
      Events.trigger("router:navigate", url);
    }
  });

  return ImageView;
});

