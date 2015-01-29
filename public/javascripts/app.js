window.App = window.App || {};

define(["backbone","router"], function(Backbone, Router){
  console.log('cyprian', Backbone);
  var App = {};
    App.start = function() {
      new Router();
      Backbone.history.start();
    };
    return App;
});
