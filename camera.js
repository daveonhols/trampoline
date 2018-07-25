function Camera(screenSize, bounds, renderBounds) {

  var limit = 50;
  this.updatePosition = function(position) {

    tx = 0;
    ty = 0;
    move = false;
    if (position.x > renderBounds.x - limit) {
      move = true;
      tx = position.x - renderBounds.x - limit;
    }
    if (position.x < renderBounds.x - limit) {
      tx = renderBounds.x - limit + position.x;
    }
    var translate = { x: tx, y: 0};
    bounds.translate(renderBounds, translate);
  }

  this.trackPosition = function(position) {
    bounds.shift(renderBounds, { x: position.x - screenSize.width / 2, y: position.y - screenSize.height / 2});
  }

}


