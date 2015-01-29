define(['backbone','handlebars','jquery','events','interact'], function(Backbone,Handlebars, $, Events, interact) {

  var ImageView = Backbone.View.extend({
    /*initialize: function(){
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

    },*/
    events: {
      'click .name': 'showSlide',
   /*   'dragstart': 'dragStart',
      'dragend': 'drop'*/
    },
    attributes: {
      draggable: true
    },
    tagName: 'figure',
    className: 'image draggable',
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
      //this.$el.addClass('dragStart');
      console.log('dragStart', arguments);
    },
    drop: function(e) { 
     //console.log('jquery',e.position());
      var evt = e.originalEvent;
      console.log('drop', arguments);
     var X = evt.pageX - 75;
     var Y = evt.pageY -75; 

      this.model.set('position',{
        x:X,
        y:Y
      });
      this.render();
      
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

//draggable configuration

  interact('.draggable')
    .draggable({
      // enable inertial throwing
      inertia: true,
      // keep the element within the area of it's parent
      restrict: {
        restriction: "parent",
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      },

      // call this function on every dragmove event
      onmove: function (event) {
        var target = event.target,
            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform =
        target.style.transform =
          'translate(' + x + 'px, ' + y + 'px)';

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      },
      // call this function on every dragend event
      onend: function (event) {
        var textEl = event.target.querySelector('p');

        textEl && (textEl.textContent =
          'moved a distance of '
          + (Math.sqrt(event.dx * event.dx +
                       event.dy * event.dy)|0) + 'px');
      }
    });



  return ImageView;
});

