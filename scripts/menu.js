Menu = function() {};

Menu.prototype = {
    create: function() {
      this.background = game.add.sprite(0, 0, 'black');
      this.ivan = game.add.sprite(game.world.centerX, game.world.centerY, game.head);
      this.ivan.anchor.setTo(0.5, 0.5);
      this.ivan.scale.setTo(1,1);

      var xpos = game.world.centerX - 200;
      var ypos = game.world.centerY;
      game.add.tween(this.ivan).to({x:xpos, y:ypos}, 500, Phaser.Easing.Elastic.Out, true, 100);

      this.logo = game.add.sprite(game.world.centerX, 40, 'logo');
      this.logo.scale.setTo(1,1);
      this.logo.anchor.setTo(0.5, 0);

      //start button
      this.btn = game.add.button(game.world.centerX + 200, game.world.centerY + 150, 'btn', this.playGame, this, 1, 0);
      this.btn.scale.setTo(1,1);
      this.btn.anchor.setTo(0.5, 0.5);
    },

    update: function() {
    },

    playGame: function() {
        game.state.start('game');
    }
}
