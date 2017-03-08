Powerup = function(game, x, y, kind) {
    Block.call(this, game, x, y, kind);
    this.kind = kind;

}

Powerup.prototype = Object.create(Block.prototype);
Powerup.prototype.constructor = Powerup;
