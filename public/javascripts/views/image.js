define(['backbone','handlebars','jquery','events'], function(Backbone,Handlebars, $, Events) {

  var ImageView = Backbone.View.extend({
    initialize: function(){
      this.$el.css('background-image', 'url(img/' + this.model.get('url') + ');');
    },
    events: {
      'click .name': 'showSlide',
      'dragstart': 'dragStart'
    },
    attributes: {
      draggable: true
    },
    tagName: 'figure',
    className: 'image',
    render: function() {
      this.$el.html("");
      var template = $("#imageTemplate").html(),
        compiled = Handlebars.compile(template),
        html = compiled(this.model.attributes);
      this.$el.css({
        'background-image': 'url(img/' + this.model.get('url') + ')'
      });

      this.$el.html(html);
      return this;
    },
    showSlide: function(e) {
      e.preventDefault();
      var id = this.model.get('_id');
      var url = "slide/" + id;
      Events.trigger("router:navigate", url);
    },
    dragStart: function() {
      this.$el.addClass('dragStart');
      console.log('dragStart', arguments);
    }
  });

  return ImageView;
});

