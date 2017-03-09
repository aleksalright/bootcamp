Preload = function() {};

Preload.prototype = {
    init: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },

    preload: function() {
        //images
        game.load.image('black', 'assets/images/black.png');
        game.load.image('logo', 'assets/images/logo.png');
        game.load.image('kdg', 'assets/images/kdg.png');
        
        //spritesheets
        game.load.spritesheet('ivan', 'assets/images/ivan.png', 360, 484);
        game.load.spritesheet('pieter', 'assets/images/pieter.png', 360, 484);
        game.load.spritesheet('karel', 'assets/images/karel.png', 360, 484);

        //script
        game.load.script('Panel', 'scripts/classes/Panel.js');
        game.load.script('Ball', 'scripts/classes/Ball.js');
        game.load.script('Block', 'scripts/classes/Block.js');
        game.load.script('Powerup', 'scripts/classes/Powerup.js');
    },

    create: function() {
        game.state.start('splash');
    }
};
