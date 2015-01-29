define(['backbone','handlebars','jquery','events'], function(Backbone,Handlebars, $, Events) {

  var ImageView = Backbone.View.extend({
    dupa: function(){
      this.$el.css('background-image', 'url(img/' + this.model.get('url') + ');');
      var min = 0,
        maxHeight = window.innerHeight-150,
        maxWidth = window.innerWidth-150,
        width = this.randomize(min,maxWidth),
        height = this.randomize(min, maxHeight);

      this.model.set('position', {
        x: width,
        y: height
      });

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
      this.setPosition();

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
    },
    randomize: function(min,max) {
      var random = Math.floor(Math.random() * (max-min+1))+ min;
      return random;
    },
    setPosition: function() {
      var position = this.model.get('position');
      this.$el.css({
        left: position.x + 'px',
        top: position.y  + 'px'
      });
    }
  });

  return ImageView;
});

