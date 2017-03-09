Settings = function() {};

Settings.prototype = {
    create: function() {
      this.background = game.add.sprite(0, 0, 'black');
    
      //sound button
      this.mute = game.add.button(game.world.centerX, game.world.centerY - 500, 'mute', this.toggleSound, this);
      this.mute.anchor.setTo(0.5, 0.5);
      this.mute.scale.setTo(0.5,0.5);
        
      //ivan
      this.ivan = game.add.button(game.world.centerX, game.world.centerY - 100, 'ivan', this.pickHead, this);
      this.ivan.anchor.setTo(0.5, 0.5);
      this.ivan.scale.setTo(0.7,0.7);
      this.ivan.name = "ivan";
        
      //pieter
      this.pieter = game.add.button(game.world.centerX - 300, game.world.centerY - 100, 'pieter', this.pickHead, this);
      this.pieter.anchor.setTo(0.5, 0.5);
      this.pieter.scale.setTo(0.7,0.7);
      this.pieter.name = "pieter";
        
      //karel
      this.karel = game.add.button(game.world.centerX + 300, game.world.centerY - 100, 'karel', this.pickHead, this);
      this.karel.anchor.setTo(0.5, 0.5);
      this.karel.scale.setTo(0.7,0.7);
      this.karel.name = "karel";
        
      //chosen head text
      var name = game.head.charAt(0).toUpperCase() + game.head.slice(1);
      this.text = "Play With: " + name;
      this.textObj = game.add.text(game.world.centerX, game.world.centerY + 200, this.text);
      this.textObj.font = "Lobster";
      this.textObj.fontSize = 175;
      this.textObj.fill = '#ffd200';
      this.textObj.align = 'center';
      this.textObj.anchor.setTo(0.5, 0.5);
        
      //back to menu button
      this.back = game.add.button(game.world.width - 250, game.world.height - 250, 'back', this.backToMenu, this);
      this.back.scale.setTo(0.5,0.5);
      this.back.anchor.setTo(0.6, 0.6);
    },

    playGame: function() {
        game.state.start('game');
    },
    
    toggleSound: function() {
        //disable double firing of tap event
        this.mute.inputEnabled = false;
        
        //toggle sound
        if(game.sound.mute) {
            game.sound.mute = false;
        }
        else {
            game.sound.mute = true;
        }
        
        //switch button frames
        if(this.mute.frame == 1) {
            this.mute.frame = 0;
        }
        else {
            this.mute.frame = 1;
        }
        
        //enable button again
        var delay = 500;
        this.timer = this.game.time.create(this.game);
        this.timer.add(delay, this.enableInput, this);
        this.timer.start();
    },
    
    enableInput: function() {
        this.mute.inputEnabled = true;
    },
    
    pickHead: function(head) {
        game.head = head.name;
        var name = head.name.charAt(0).toUpperCase() + head.name.slice(1);
        this.text = "Play With: " + name;
        this.textObj.setText(this.text);
    },
    
    backToMenu: function() {
        game.state.start('menu');
    }
}
