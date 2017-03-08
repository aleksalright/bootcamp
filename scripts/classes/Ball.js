Ball = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'ball_' + game.head);

    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.bounce.setTo(1, 1);
    this.latestWall = null;
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

Ball.prototype.deflect = function() {
    var panel = this.latest;
    var diff = this.x - panel.x;

    this.body.velocity.x = 5 * diff;
    this.body.velocity.setMagnitude(game.mag);
}

Ball.prototype.applyEffect = function(effect) {
    switch (effect) {
        case 'faster':
            this.speedUp();
            break;
        case 'slower':
            this.slowDown();
            break;
        case 'multi':
            // implement multiply method
            break;
        default:
            break;
    }
}

Ball.prototype.speedUp = function() {
    this.body.velocity.multiply(1.2, 1.2);
    game.mag = this.body.velocity.getMagnitude();
}

Ball.prototype.slowDown = function() {
    this.body.velocity.multiply(0.8, 0.8);
    game.mag = this.body.velocity.getMagnitude();
}
