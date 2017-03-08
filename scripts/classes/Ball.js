Ball = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'ball_' + game.head);

    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.bounce.setTo(1, 1);
    // this.body.maxVelocity = new Phaser.Point(1000, 1000);
    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(game.scaleRatio, game.scaleRatio);
    this.launched = false;
    game.add.existing(this);
}

Ball.prototype = Object.create(Phaser.Sprite.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.move = function(x, y = null) {
    y = (y === null ? x : y);
    if (!this.launched) {
        this.body.velocity.setTo(x, y);
        this.launched = true;
    }
};
