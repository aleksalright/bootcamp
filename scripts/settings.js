Settings = function() {};

Settings.prototype = {
    create: function() {
      this.background = game.add.sprite(0, 0, 'black');
    
      //text: play with
      this.baseText = game.add.bitmapText(game.world.centerX, game.world.centerY -500, 'bLobster', "Play With:");
      this.baseText.fontSize = 175;
      this.baseText.fill = '#ffd200';
      this.baseText.align = 'center';
      this.baseText.anchor.setTo(0.5, 0.5);
        
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
        
      //select current head
      switch(game.head) {
            case "ivan":
                this.ivan.frame = 1;
                this.pieter.frame = 0;
                this.karel.frame = 0;
                break;
            case "pieter":
                this.ivan.frame = 0;
                this.pieter.frame = 1;
                this.karel.frame = 0;
                break;
            case "karel":
                this.ivan.frame = 0;
                this.pieter.frame = 0;
                this.karel.frame = 1;
                break;
        }
        
      //name text
      var name = game.head.charAt(0).toUpperCase() + game.head.slice(1);
      this.textObj = game.add.bitmapText(game.world.centerX, game.world.centerY + 350, 'bLobster', name);
      this.textObj.fontSize = 350;
      this.textObj.fill = '#ffd200';
      this.textObj.align = 'center';
      this.textObj.anchor.setTo(0.5, 0.5);
        
      //sound button
      this.mute = game.add.button(250, game.world.height - 250, 'mute', this.toggleSound, this);
      this.mute.anchor.setTo(0.5, 0.5);
      this.mute.scale.setTo(0.4,0.4);
        
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
        var delay = 50;
        this.timer = this.game.time.create(this.game);
        this.timer.add(delay, this.enableInput, this);
        this.timer.start();
    },
    
    enableInput: function() {
        this.mute.inputEnabled = true;
        this.ivan.inputEnabled = true;
        this.pieter.inputEnabled = true;
        this.karel.inputEnabled = true;
    },
    
    pickHead: function(head) {
        //disable double firing of tap event
        this.ivan.inputEnabled = false;
        this.pieter.inputEnabled = false;
        this.karel.inputEnabled = false;
        
        game.head = head.name;
        
        var name = head.name.charAt(0).toUpperCase() + head.name.slice(1);
        this.text = name;
        this.textObj.setText(this.text);
        
        switch(head.name) {
            case "ivan":
                this.ivan.frame = 1;
                this.pieter.frame = 0;
                this.karel.frame = 0;
                break;
            case "pieter":
                this.ivan.frame = 0;
                this.pieter.frame = 1;
                this.karel.frame = 0;
                break;
            case "karel":
                this.ivan.frame = 0;
                this.pieter.frame = 0;
                this.karel.frame = 1;
                break;
        }
        
        //enable button again
        var delay = 50;
        this.timer = this.game.time.create(this.game);
        this.timer.add(delay, this.enableInput, this);
        this.timer.start();
    },
    
    backToMenu: function() {
        game.state.start('menu');
    }
}
