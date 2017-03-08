PanelSmall = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'small');

    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.immovable = true;
    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(game.scaleRatio, game.scaleRatio);
    game.add.existing(this);
}

PanelSmall.prototype = Object.create(Phaser.Sprite.prototype);
PanelSmall.prototype.constructor = PanelSmall;
