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

        this.ballEffects = ['slower', 'faster', 'multi'];
        game.spacingX = game.world.width / 6;
        game.spacingY = game.world.height / 2.5;


        this.blocksLayout = [
            6, 6, 6, 6, 6, 6, 6,
            0, 2, 0, 1, 2, 1, 2,
            1, 0, 0, 1, 1, 0, 1,
            0, 1, 1, 1, 2, 1, 1,
            1, 1, 1, 2, 3, 4, 5,
            1, 2, 0, 0, 0, 6, 1,
        ];
        game.activeBlocks = [];

        game.time.advancedTiming = true;
        colors = Phaser.Color.HSVColorWheel();
        index = 0;
        player1 = new Panel(game, game.world.centerX, 0, 'Player 1');
        player2 = new Panel(game, game.world.centerX, game.world.height, 'Player 2');
        this.panels.add(player1);
        this.panels.add(player2);
        mainBall = new Ball(game, game.world.centerX, game.world.centerY);
        this.ballRotate = game.add.tween(mainBall);

        balls.add(mainBall);

        game.input.onDown.add(function() {
            balls.forEach(function(ball) {
                if (ball.latestWall === 'up') {
                    ball.move(0, -1);
                    ball.body.velocity.setMagnitude(game.mag);
                } else if (ball.latestWall === 'down') {
                    ball.move(0, 1);
                    ball.body.velocity.setMagnitude(game.mag);
                } else {
                    ball.move(400);
                    game.mag = ball.body.velocity.getMagnitude();
                }


            }, this)
        });
    },
    update: function() {

        game.physics.arcade.collide(balls, this.blocks, this.ballBlockCollision, this.blockGhosting, this);
        game.physics.arcade.collide(balls, balls);
        game.physics.arcade.collide(balls, this.panels, this.ballPanelCollision, null, this);


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
                ball.latestWall = 'up';

                textReflect = game.add.text(game.world.centerX, game.world.centerY + 50, '- PHASER -')

                //  Centers the text
                textReflect.anchor.set(0.5)
                textReflect.align = 'center'
                textReflect.scale.y = -1

                //  Our font + size
                textReflect.font = 'Arial'
                textReflect.fontWeight = 'bold'
                textReflect.fill = 'red'
                textReflect.alpha = 1;
                game.add.tween(textReflect).to({
                    alpha: 0
                }, 2000, Phaser.Easing.Linear.None, true);

                mainBall.x = game.world.centerX
                mainBall.y = game.world.centerY - game.spacingY / 2;
                mainBall.body.velocity.setTo(0, 0)
                mainBall.launched = false
                player1.updateText();
                game.camera.shake(0.001, 500);
                this.vibrateDevice();
            } else if (ball.body.blocked.down) {
                player2.score -= 1;
                ball.latestWall = 'down';
                textReflect = game.add.text(game.world.centerX, game.world.centerY + 50, '- PHASER -')

                //  Centers the text
                textReflect.anchor.set(0.5)
                textReflect.align = 'center'
                textReflect.scale.y = -1

                //  Our font + size
                textReflect.font = 'Arial'
                textReflect.fontWeight = 'bold'
                textReflect.fontSize = 70
                textReflect.fill = 'red'
                textReflect.alpha = 1;
                game.add.tween(textReflect).to({
                    alpha: 0
                }, 2000, Phaser.Easing.Linear.None, true);

                player2.updateText();
                game.camera.shake(0.001, 500)
                mainBall.x = game.world.centerX
                mainBall.y = game.world.centerY + game.spacingY / 2;


                mainBall.body.velocity.setTo(0, 0)
                mainBall.launched = false
                game.camera.shake(0.001, 500);
                this.vibrateDevice();
            }

        }, this);

        if (player1.score === 0) {
            game.state.start('P2win');
        } else if (player2.score === 0) {
            game.state.start('P1win');
        }
        if (c >= 120 && c % 120 === 0) {
            this.spawnBlock();
        }
        c++;
    },
    spawnBlock: function() {

        var index = game.rnd.integerInRange(0, this.blocksLayout.length - 1);
        var kind = this.blocksLayout[index];
        var x = (index % this.cols);
        var y = Math.floor((index / this.cols));

        var mapX = Phaser.Math.mapLinear(x, 0, this.cols - 1, game.spacingX, game.width - game.spacingX);
        var mapY = Phaser.Math.mapLinear(y, 0, (this.blocksLayout.length / this.cols) - 1, game.spacingY, game.height - game.spacingY);
        var spawnable = true;

        if (game.activeBlocks.length != 0) {
            for (var i = 0; i < game.activeBlocks.length; i++) {
                var block = game.activeBlocks[i];
                if (Phaser.Point.distance(block, new Phaser.Point(mapX, mapY)) < 50) {
                    spawnable = false;
                }
            }
        }
        // Check what kind of block it is
        if (spawnable) {
            var block;
            switch (kind) {
                case 1:
                    block = new Block(game, mapX, mapY);
                    break;
                case 2:
                    block = new Powerup(game, mapX, mapY, 'faster');
                    break;
                case 3:
                    block = new Powerup(game, mapX, mapY, 'slower');
                    break;
                case 4:
                    block = new Powerup(game, mapX, mapY, 'bigger');
                    break;
                case 5:
                    block = new Powerup(game, mapX, mapY, 'smaller');
                    break;
                case 6:
                    block = new Powerup(game, mapX, mapY, 'health');
                    break;
                default: //do nothing
                    break;

            }
            if (block) {
                this.blocks.add(block);
                game.activeBlocks.push(block);
            }

        }

        return spawnable;
    },
    ballBlockCollision: function(ball, block) {
        if (block.constructor.name === 'Powerup') {
            this.powerUpCollision(ball, block);
        }
        this.popSound.play();
        block.kill();
    },
    powerUpCollision: function(ball, powerup) {
        if (this.ballEffects.indexOf(powerup.kind) != -1) {
            // Apply effect to ball
            ball.applyEffect(powerup.kind);
        } else {
            // Apply effect to panel that was most recently touched
            ball.latest.applyEffect(powerup.kind);
        }
    },
    ballPanelCollision: function(ball, panel) {
        ball.latest = panel;
        panel.tint = Phaser.Color.getRandomColor();
        this.ballRotate.to({
            angle: 720
        }, 500, Phaser.Easing.Linear.None, true);

        ball.deflect();
    },
    blockGhosting: function(ball, block) {
        return !block.ghost;
    },
    vibrateDevice: function() {
        if (game.device.vibration) {
            window.navigator.vibrate(100);
        }
    }
}
