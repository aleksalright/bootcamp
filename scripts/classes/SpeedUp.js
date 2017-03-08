SpeedUp = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'fast');

    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.immovable = true;
    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(game.scaleRatio, game.scaleRatio);
    game.add.existing(this);
}

SpeedUp.prototype = Object.create(Phaser.Sprite.prototype);
SpeedUp.prototype.constructor = SpeedUp;
