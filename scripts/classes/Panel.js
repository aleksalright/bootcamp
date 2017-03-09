Panel = function(game, x, y, id) {
    Phaser.Sprite.call(this, game, x, y, 'panel');
    this.id = id;
    this.health = 5;
    this.healthBar = [];
    this.checkHealthBar();
    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.immovable = true;
    this.anchor.setTo(0.5, 0.5);

    this.panelVelocity = 250;
    this.maxPanelSpeed = 100;

    game.add.existing(this);
}

Panel.prototype = Object.create(Phaser.Sprite.prototype);
Panel.prototype.constructor = Panel;

Panel.prototype.move = function(target) {
    if (Math.abs(this.x - target.x) < this.width * 2) {
        this.x = target.x;
    }
    if (this.x < this.width * 0.5) {
        this.x = this.width * 0.5;
    } else if (this.x > game.width - this.width * 0.5) {
        this.x = game.width - this.width * 0.5;
    }
}

Panel.prototype.blinkBar = function(){
  
}

Panel.prototype.applyEffect = function(effect) {
    timer = game.time.create(false);
    switch (effect) {
        case 'smaller':
            this.shrink();
            timer.add(10000, this.normal, this);
            break;
        case 'bigger':
            this.grow();
            timer.add(10000, this.normal, this);
            break;
        case 'health':
            this.addHealth();
            break;
        default:
            break;
    }
}

Panel.prototype.checkHealthBar = function() {

    for (var m = 0; m < this.healthBar.length; m++) {
        this.healthBar[m].kill();
    }
    this.healthBar = [];
    var j;

    for (j = 0; j < this.health; j++) {
        if (this.y > game.world.centerY) {
            var barX = (70) + (25 * j + 47.5 * j);
            var barY = game.world.height - 70;

        } else {
            var barX = (game.world.width - 70) - (25 * j + 47.5 * j);
            var barY = 70;
        }
        var heart = game.add.sprite(barX, barY, 'hearts', 0);
        heart.scale.setTo(1.5, 1.5)
        heart.anchor.setTo(0.5);
        this.healthBar.push(heart);
    }


    for (var k = j; k < 5; k++) {
        if (this.y > game.world.centerY) {
            var barX = (70) + (25 * k + 47.5 * k);
            var barY = game.world.height - 70;

        } else {
            var barX = (game.world.width - 70) - (25 * k + 47.5 * k);
            var barY = 70;
        }
        var heart = game.add.sprite(barX, barY, 'hearts', 1);
        heart.scale.setTo(1.5, 1.5);
        heart.anchor.setTo(0.5);

        this.healthBar.push(heart);
    }
}

Panel.prototype.addHealth = function() {
    this.health += 1;
}

Panel.prototype.grow = function() {
    this.loadTexture('bigPallet');
}

Panel.prototype.shrink = function() {
    this.loadTexture('smallPallet');
}

Panel.prototype.normal = function() {
    this.loadTexture('panel');
}
