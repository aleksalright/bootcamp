Splash = function() {};

Splash.prototype = {
    preload: function() {
        //spritesheets
        game.load.spritesheet('btn', 'assets/images/startbtn.png', 1020, 510);

        //images
        game.load.image('ball', 'assets/images/ball.png');
        game.load.image('ball_ivan', 'assets/images/ball_ivan.png');
        game.load.image('ball_karel', 'assets/images/ball_karel.png');
        game.load.image('ball_pieter', 'assets/images/ball_pieter.png');
        game.load.image('panel', 'assets/images/pallet.png');
        game.load.image('block', 'assets/images/brick.png');
        game.load.image('P1win', 'assets/images/P1win.png');
        game.load.image('P2win', 'assets/images/P2win.png');;
        game.load.image('fast', 'assets/images/fast.png');
        game.load.image('sad_ivan', 'assets/images/sad_ivan.png');
        game.load.image('background', 'assets/images/background.jpg');
        game.load.image('fast', 'assets/images/fast.png');
        game.load.image('slow', 'assets/images/slow.png');

        game.load.image('big', 'assets/images/big.png');
        game.load.image('small', 'assets/images/small.png');


        game.load.image('bigPallet', 'assets/images/bigPallet.png');
        game.load.image('smallPallet', 'assets/images/smallPallet.png');

        game.load.image('extraHealth', 'assets/images/extraHealth.png');


        //scripts
        game.load.script('Ball', 'scripts/classes/Ball.js');
        game.load.script('Block', 'scripts/classes/Block.js');
        game.load.script('Panel', 'scripts/classes/Panel.js');
        game.load.script('Powerup', 'scripts/classes/Powerup.js');

        game.load.script('SpeedUp', 'scripts/classes/SpeedUp.js');
        game.load.script('SlowDown', 'scripts/classes/SlowDown.js');
        game.load.script('PanelBig', 'scripts/classes/PanelBig.js');
        game.load.script('PanelSmall', 'scripts/classes/PanelSmall.js');
        game.load.script('ExtraHealth', 'scripts/classes/ExtraHealth.js');

        //audio
        game.load.audio('pop', 'assets/sounds/pop.mp3');
        game.load.audio('win', 'assets/sounds/win.mp3');
    },

    create: function() {
        //background and logo
        this.background = game.add.sprite(0, 0, 'black');
        this.background.scale.setTo(game.scaleRatio, game.scaleRatio);
        this.kdg = game.add.sprite(game.world.centerX, game.world.centerY, 'kdg');
        this.kdg.scale.setTo(game.scaleRatio, game.scaleRatio);
        this.kdg.anchor.setTo(0.5, 0.5);

        //timer show ivan
        var delay = 1500;
        this.timer = this.game.time.create(this.game);
        this.timer.add(delay, this.showIvan, this);
        this.timer.start();

        //timer go to menu
        var delay = 3000;
        this.timer = this.game.time.create(this.game);
        this.timer.add(delay, this.startGame, this);
        this.timer.start();
    },

    update: function() {},

    startGame: function() {
        game.state.start('menu');
    },

    showIvan: function() {
        var heads = ['ivan', 'pieter', 'karel'];
        game.head = Phaser.ArrayUtils.getRandomItem(heads);
        this.ivan = game.add.sprite(game.world.centerX, game.world.centerY, game.head);
        this.ivan.anchor.setTo(0.5, 0.5);
        this.ivan.scale.setTo(0, 0);

        game.add.tween(this.ivan.scale).to({
            x: game.scaleRatio * 1.3,
            y: game.scaleRatio * 1.3
        }, 500, Phaser.Easing.Elastic.Out, true, 100);
    }
};
