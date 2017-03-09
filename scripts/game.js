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
        this.tilesprite = game.add.tileSprite(0, 140, game.world.width, game.world.height - 280, 'background');

        this.banner1 = game.add.sprite(game.world.centerX, 70, 'banner');
        this.banner1.anchor.setTo(0.5, 0.5);
        this.banner1.width = game.world.width;

        this.banner2 = game.add.sprite(game.world.centerX, game.world.height - 70, 'banner');
        this.banner2.anchor.setTo(0.5, 0.5);
        this.banner2.width = game.world.width;
        this.banner2.angle = 180;

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
        game.paused = true;
        game.time.advancedTiming = true;
        colors = Phaser.Color.HSVColorWheel();
        index = 0;
        player1 = new Panel(game, game.world.centerX, 150, '1');
        player2 = new Panel(game, game.world.centerX, game.world.height - 150, '2');
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
            game.paused = false;
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
            var dir;
            var player;
            if (ball.body.blocked.up) {
                player = player1;
                dir = 1;
                ball.latestWall = 'up';

            } else if (ball.body.blocked.down) {
                player = player2;
                dir = -1;
                ball.latestWall = 'down';
            }
            if (player) {
                player.health -= 1;
                player.checkHealthBar();
                this.checkEnd(player);
                //  player.updateText();
                game.camera.shake(0.001, 500);
                this.vibrateDevice();
                ball.reset(dir);
                game.paused = true;
            }
        }, this);

        if (!game.paused) {
            if (c >= 120 && c % 120 === 0) {
                this.spawnBlock();
            }
            c++
        };
    },
    checkEnd: function(player) {
        var head;
        if (player.health == 0) {
            game.winner = player.id;
            game.state.start('win');
        }
    },
    spawnBlock: function() {

        var index = game.rnd.integerInRange(0, this.blocksLayout.length - 1);
        var type = this.blocksLayout[index];
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
            var kind;
            switch (type) {
                case 1:
                    kind = 'block';
                    break;
                case 2:
                    kind = 'faster';
                    break;
                case 3:
                    kind = 'slower';
                    break;
                case 4:
                    kind = 'health';
                    break;
                case 5:
                    kind = 'bigger';
                    break;
                case 6:
                    kind = 'smaller';
                    break;
                default: //do nothing
                    break;
            }
            if (kind != 'block') block = new Powerup(game, mapX, mapY, kind);
            else block = new Block(game, mapX, mapY);

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
