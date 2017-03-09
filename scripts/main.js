var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO);

game.state.add('preload', Preload);
game.state.add('splash', Splash);
game.state.add('menu', Menu);
game.state.add('settings', Settings);
game.state.add('game', Game);
game.state.add('win', Win);

game.state.start('preload');
