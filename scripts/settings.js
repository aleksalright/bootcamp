Settings = function() {};

Settings.prototype = {
    create: function() {
      this.background = game.add.sprite(0, 0, 'black');
    
      //sound button
      this.mute = game.add.button(game.world.centerX, game.world.centerY - 250, 'mute', this.toggleSound, this);
      this.mute.anchor.setTo(0.5, 0.5);
        
      //ivan
      this.ivan = game.add.button(game.world.centerX, game.world.centerY, 'ivan', this.pickHead, this);
      this.ivan.anchor.setTo(0.5, 0.5);
      this.ivan.scale.setTo(0.5,0.5);
      this.ivan.name = "ivan";
        
      //pieter
      this.pieter = game.add.button(game.world.centerX - 200, game.world.centerY, 'pieter', this.pickHead, this);
      this.pieter.anchor.setTo(0.5, 0.5);
      this.pieter.scale.setTo(0.5,0.5);
      this.pieter.name = "pieter";
        
      //karel
      this.karel = game.add.button(game.world.centerX + 200, game.world.centerY, 'karel', this.pickHead, this);
      this.karel.anchor.setTo(0.5, 0.5);
      this.karel.scale.setTo(0.5,0.5);
      this.karel.name = "karel";
        
      //play button
      this.btn = game.add.button(game.world.centerX, game.world.centerY + 300, 'btn2', this.playGame, this, 1, 0);
      this.btn.scale.setTo(2,2);
      this.btn.anchor.setTo(0.5, 0.5);
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
            console.log('unmute');
        }
        else {
            game.sound.mute = true;
            console.log('mute');
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
    }
}
