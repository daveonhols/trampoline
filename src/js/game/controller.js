
var buildController = function(world, Matter, Camera) {

  var ball = world.ball;
  var todo_forces = [];
  console.log("camera");
  console.log(Camera);
  var camera = new Camera({width: 800, height: 600}, Matter.Bounds, world.render.bounds);

  var Key = {
    _pressed: {},

    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,

    isDown: function(keyCode) {
      return this._pressed[keyCode];
    },

    onKeydown: function(event) {
      this._pressed[event.keyCode] = true;
    },

    onKeyup: function(event) {
      delete this._pressed[event.keyCode];
    }
  };

  window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
  window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);


  var control_right = function() {
    Matter.Body.applyForce(ball, { x: 0, y: 0 }, { x: 0.00005, y: 0});
  }

  var control_left = function() {
    Matter.Body.applyForce(ball, { x: 0, y: 0 }, { x: -0.00005, y: 0});
  }

  var setup = function() {
    $("#mr").on('click', control_right);
    $("#ml").on('click', control_left);
  }

  var  before = function() {
      if (Key.isDown(Key.LEFT)) control_left();
      if (Key.isDown(Key.RIGHT)) control_right();
      if(todo_forces.length > 0) {
        Matter.Body.applyForce.apply(null, todo_forces[0]);
        todo_forces = [];
      }
      camera.trackPosition(ball.position);

  }

  var boost = function() {
    todo_forces.push([ball, { x: 1, y: 1 }, { x: 0, y: -0.0005}]);
  }

  Matter.Events.on(world.engine, "beforeUpdate", before);
  Matter.Events.on(world.engine, "collisionEnd", boost);

  $(document).ready(setup);

};

exports.build = buildController;