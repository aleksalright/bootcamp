Splash = function() {};

Splash.prototype = {
    preload: function() {
        //spritesheets
        game.load.spritesheet('btn', 'assets/images/startbtn.png', 340, 170);

        //images
        game.load.image('ball', 'assets/images/ball.png');
        game.load.image('ball_ivan', 'assets/images/ball_ivan.png');
        game.load.image('ball_karel', 'assets/images/ball_karel.png');
        game.load.image('ball_pieter', 'assets/images/ball_pieter.png');
        game.load.image('panel', 'assets/images/pallet.png');
        game.load.image('block', 'assets/images/brick.png');
        game.load.image('player1_win', 'assets/images/player1_win.png');
        game.load.image('player2_win', 'assets/images/player2_win.png');
        game.load.image('fast', 'assets/images/fast.png');
        game.load.image('sad_ivan', 'assets/images/sad_ivan.png');
        game.load.image('background', 'assets/images/background.jpg');
        game.load.image('faster', 'assets/images/fast.png');
        game.load.image('slower', 'assets/images/slow.png');

        game.load.image('bigger', 'assets/images/big.png');
        game.load.image('smaller', 'assets/images/small.png');


        game.load.image('bigPallet', 'assets/images/bigPallet.png');
        game.load.image('smallPallet', 'assets/images/smallPallet.png');

        game.load.image('health', 'assets/images/extraHealth.png');


        //scripts


        //audio
        game.load.audio('pop', 'assets/sounds/pop.mp3');
        game.load.audio('win', 'assets/sounds/win.mp3');
    },

    create: function() {
        //background and logo
        this.background = game.add.sprite(0, 0, 'black');
        this.kdg = game.add.sprite(game.world.centerX, game.world.centerY, 'kdg');
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
    startGame: function() {
        game.state.start('menu');
    },
    showIvan: function() {
        game.heads = ['ivan', 'pieter', 'karel'];
        game.head = Phaser.ArrayUtils.getRandomItem(game.heads);
        this.kdg.kill();
        this.ivan = game.add.sprite(game.world.centerX, game.world.centerY, game.head);
        this.ivan.anchor.setTo(0.5, 0.5);
        this.ivan.scale.setTo(0, 0);

        game.add.tween(this.ivan.scale).to({
            x: 1.3,
            y: 1.3
        }, 500, Phaser.Easing.Elastic.Out, true, 100);
    }
};
