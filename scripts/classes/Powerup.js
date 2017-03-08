Powerup = function(game, x, y, kind) {
  Block.call(this, game, x, y, kind);

}

Powerup.prototype = Object.create(Block.prototype);
Powerup.prototype.constructor = Powerup;
