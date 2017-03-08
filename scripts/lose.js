Lose = function() {};

Lose.prototype = {
    create: function() {
        //background
        this.background = game.add.sprite(0, 0, 'black');

        //ivan
        this.ivan = game.add.sprite(game.world.centerX, game.world.centerY - 100, game.head);
        this.ivan.anchor.setTo(0.5, 0.5);
        this.ivan.scale.setTo(game.scaleRatio, game.scaleRatio);
        this.ivan.angle = -20;
        game.add.tween(this.ivan).to({angle: 20}, 500, null, true, 0, Infinity, true);

        //YOU LOSE
        this.lose = game.add.sprite(game.world.centerX, game.world.centerY + 200, 'lose');
        this.lose.anchor.setTo(0.5, 0.5);
        this.loseSound = game.add.audio('lose');
        this.loseSound.play();

        //timer go back to menu
        var delay = 3000;
        this.timer = this.game.time.create(this.game);
        this.timer.add(delay, this.startGame, this);
        this.timer.start();
    },

    update: function() {
    },

    startGame: function() {
        game.state.start('menu');
    }
}
