Panel = function(game, x, y, id) {
    Phaser.Sprite.call(this, game, x, y, 'panel');
    this.id = id;
    this.score = 5;
    var styles = {
        font: '64px Verdana',
        fill: '#FFF'
    }
    var textX = 64;
    var textY = y > game.world.centerY? game.world.height - 64 - 32: 64;
    this.text = game.add.text(textX, textY, `Health ${this.id}: ${this.score}`, styles)
    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.immovable = true;
    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(game.scaleRatio, game.scaleRatio);

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

Panel.prototype.applyEffect = function(effect) {
    switch (effect) {
        case 'smaller':
            this.shrink();
            break;
        case 'bigger':
            this.grow();
            break;
        case 'health':
            this.addHealth();
            break;
        default:
            break;
    }
}

Panel.prototype.updateText = function(){
  this.text.setText(`Health ${this.id}: ${this.score}`);
}

Panel.prototype.addHealth = function() {
    this.score += 1;
    this.updateText();
}
Panel.prototype.grow = function() {
    this.loadTexture('bigPallet');
}

Panel.prototype.shrink = function() {
    this.loadTexture('smallPallet');
}
