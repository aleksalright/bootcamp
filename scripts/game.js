Game = function(game) {}
var c = 0;
Game.prototype = {
    init: function() {
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
    },
    render: function() {

    },

    create: function() {
        game.input.addPointer();
        game.input.addPointer();
        game.input.addPointer();
        game.input.addPointer();

        this.pointers = game.input.pointers;

        this.cols = 7;
        this.tilesprite = this.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');
        this.popSound = game.add.audio('pop');
        this.blocks = game.add.group();
        this.panels = game.add.group();
        balls = game.add.group();

        this.powerups = game.add.group();

        this.blocksLayout = [
            1, 1, 0, 0, 2, 1, 1,
            0, 2, 0, 1, 2, 1, 2,
            1, 0, 0, 1, 1, 0, 1,
            0, 1, 1, 1, 2, 1, 1,
            1, 1, 1, 2, 1, 2, 1,
            1, 2, 0, 0, 0, 1, 1,
        ];
        this.activeBlocks = [];

        game.time.advancedTiming = true;
        colors = Phaser.Color.HSVColorWheel();
        index = 0;

        player1 = new Panel(game, game.world.centerX, 0, 'player1');
        player2 = new Panel(game, game.world.centerX, game.world.height, 'player2');
        this.panels.add(player1);
        this.panels.add(player2);
        mainBall = new Ball(game, game.world.centerX, game.world.centerY);
        this.ballRotate = game.add.tween(mainBall);

        balls.add(mainBall);

        game.input.onDown.add(function() {
            balls.forEach(function(ball) {
                ball.move(400);
            }, this)
        });
        this.scoreText();

    },
    update: function() {

        game.physics.arcade.collide(balls, this.blocks, this.ballBlockCollision, this.blockGhosting, this);
        game.physics.arcade.collide(balls, balls);
        game.physics.arcade.collide(balls, this.panels, this.ballPanelCollision, null, this);

        game.physics.arcade.collide(balls, this.powerups, this.powerUpCollision, null, this);

        for (var i = 0; i < this.pointers.length; i++) {
            var pointer = this.pointers[i];
            if (pointer.x != -1 && pointer.y != -1) {
                if (pointer.y > game.world.centerY) {
                    player2.move(pointer);
                } else {
                    player1.move(pointer);
                }
            }
        }

        balls.forEach(function(ball) {
            if (ball.body.blocked.up) {
                player1.score -= 1;
                score_one.setText(`levens: ${player1.score}`);
                game.camera.shake(0.001, 500);
                this.vibrateDevice();
            } else if (ball.body.blocked.down) {
                player2.score -= 1;
                score_two.setText(`levens: ${player2.score}`);
                game.camera.shake(0.001, 500);
                this.vibrateDevice();
            }

        }, this);

        if (player1.score === 0) {
            game.state.start('P2win');
        } else if (player2.score === 0) {
            game.state.start('P1win');
        }
        if (c >= 120 && c % 120 == 0) {
            this.spawnBlock();
        }
        c++;
    },
    spawnBlock: function() {
        var spacingX = game.world.width / 6;
        var spacingY = game.world.height / 2.5;
        var index = game.rnd.integerInRange(0, this.blocksLayout.length - 1);
        var kind = this.blocksLayout[index];
        var x = (index % this.cols);
        var y = Math.floor((index / this.cols));

        var mapX = Phaser.Math.mapLinear(x, 0, this.cols - 1, spacingX, game.width - spacingX);
        var mapY = Phaser.Math.mapLinear(y, 0, (this.blocksLayout.length / this.cols) - 1, spacingY, game.height - spacingY);
        var spawnable = true;

        if (this.activeBlocks.length != 0) {
            for (var i = 0; i < this.activeBlocks.length; i++) {
                var block = this.activeBlocks[i];
                if (Phaser.Point.distance(block, new Phaser.Point(mapX, mapY)) < 50) {
                    spawnable = false;
                }
            }
        }
        // Check what kind of block it is
        if (spawnable) {
            switch (kind) {
                case 1:
                    var block = new Block(game, mapX, mapY);
                    this.blocks.add(block);
                    this.activeBlocks.push(block);
                    break;
                case 2:
                    var powerUp = new Powerup(game, mapX, mapY);
                    this.powerups.add(powerUp);
                    break;
                default: //do nothing
                    break;
            }
        }


    },
    ballBlockCollision: function(ball, block) {
        this.popSound.play();
        block.kill();
    },
    powerUpCollision: function(ball, powerup) {
        this.popSound.play();
        this.ballspeedUp(ball);
        powerup.kill();
    },
    ballPanelCollision: function(ball, panel) {

        panel.tint = Phaser.Color.getRandomColor();
        this.ballRotate.to({
            angle: 720
        }, 500, Phaser.Easing.Linear.None, true);
    },
    ballspeedUp: function(ball) {
        ball.body.velocity.multiply(1.4, 1.4);
    },
    scoreText: function() {
        var styles = {
            font: '64px Verdana',
            fill: '#FFF'
        }
        score_one = game.add.text(64, 64, `Player 1: ${player1.score}`, styles);
        score_two = game.add.text(64, game.world.height - 64 - 64, `Player 2: ${player2.score}`, styles);



    },
    blockGhosting: function(ball, block) {
        return !block.ghost;
    },
    vibrateDevice: function(){
      if (game.device.vibration) {
          window.navigator.vibrate(100);
      }
    },
}
