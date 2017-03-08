var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO);

game.state.add('preload', Preload);
game.state.add('splash', Splash);
game.state.add('menu', Menu);
game.state.add('game', Game);
game.state.add('P1win', P1win);
game.state.add('P2win', P2win);

game.state.start('preload');
