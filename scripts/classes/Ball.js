Ball = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'ball_' + game.head);

    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.bounce.setTo(1, 1);
    this.latestWall = null;
    this.anchor.setTo(0.5, 0.5);
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
    timer = game.time.create(false);
    switch (effect) {
        case 'faster':
            this.speedUp();
            timer.add(5000, this.normal, this);
            break;
        case 'slower':
            this.slowDown();
            timer.add(5000, this.normal, this);
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

Ball.prototype.reset = function(dir) {
    this.x = game.world.centerX;
    this.y = game.world.centerY + (-dir * game.spacingY / 2);
    this.body.velocity.setTo(0, 0);
    this.launched = false;
}

Ball.prototype.normal = function() {
    this.body.velocity.multiply(0.4, 0.4);
    game.mag = this.body.velocity.getMagnitude();
}
