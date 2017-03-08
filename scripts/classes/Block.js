Block = function(game, x, y, texture = 'block') {
    console.log(texture);
    Phaser.Sprite.call(this, game, x, y, texture);

    this.ghost = true;
    this.alpha = 0.3;
    var tween = game.add.tween(this).to({
        alpha: 1
    }, 2000, Phaser.Easing.Bounce.In);
    tween.onComplete.add(function() {
        this.ghost = false;
    }, this);
    tween.start();

    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.immovable = true;
    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(game.scaleRatio, game.scaleRatio);
    game.add.existing(this);
}

Block.prototype = Object.create(Phaser.Sprite.prototype);
Block.prototype.constructor = Block;

Block.prototype.kill = function() {
    var index = game.activeBlocks.indexOf(this);
    game.activeBlocks.splice(index, 1);

    Phaser.Sprite.prototype.kill.call(this);
}
