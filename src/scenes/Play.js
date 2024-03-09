class Play extends Phaser.Scene {
    constructor() {
        super("play_scene");
        this.isJumping = false;
    }
 
    preload(){
        this.load.image("background", "assets/fake_background.png")
        this.load.image("dragon", "assets/dragon.png")
        this.load.image("border", "assets/border.png")
    }   
    create(){
        const gameWidth = this.cameras.main.width;
        const gameHeight = this.cameras.main.height;
        this.background = this.add.tileSprite(0, 0, gameWidth, gameHeight, 'background').setOrigin(0.5, 0.5);
        this.background.setPosition(gameWidth / 2, gameHeight / 2);

        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Animation details
        const animationFrameRate = 10; // Replace with your animation's frame rate
        const animationFrameCount = 10; // Replace with your animation's frame count
        this.animationDuration = (animationFrameCount / animationFrameRate) * 1000; // Duration in millisecond}

        //dragon
        this.dragon = this.physics.add.sprite(config.width / 3, config.height / 3, "dragon");
        this.dragon.setScale(.3)

        this.hands = this.add.sprite(config.width / 2, config.height/ 1.1, 'hands'); 
        this.hands.setScale(13)

        this.border = this.add.sprite(config.width / 2, config.height/ 2, 'border');

        

        //dragon tween
        // let dragonTween = this.tweens.chain({
        //     targets: this.dragon,
        //     loop: 1,
        //     paused: false,
        //     tweens: [
        //         {
        //             x: gameWidth - 500,
        //             duration: 1000,
        //             angle: 15
        //         },
        //         { x: 1000,
        //             duration: 1500,
        //             angle: 0
        //         }
        //     ]
        // })

        //syringe

        //smack

        //zoom
        this.cursors = this.input.keyboard.createCursorKeys();
        this.horizontalSpeed = 1
        this.zoomSpeed = .01; // How quickly the camera zooms in
        this.maxZoom = 3; // Maximum zoom level
        this.defaultZoom = 1; // Normal zoom level
        this.currentZoom = 1; // Start with normal size
        this.zoomIncrement = 0.2; // Adjust this value to control how much it zooms each time

        //use key
        const keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.keySpace)
        this.KeySpace = keySpace
    }

    update(){
        if (this.cursors.left.isDown) {
            this.background.tilePositionX -= this.horizontalSpeed;
        }
    
        if (this.cursors.right.isDown) {
            this.background.tilePositionX += this.horizontalSpeed;
        }
        if (this.cursors.up.isDown){
            // arm.anims.play('run')
            this.forward()
        }
        if (this.cursors.down.isDown){
            this.hands.anims.play('use', true);
            this.forward()
        }

        this.dragonmove()

        //arms tween
        if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
            this.hands.anims.play('use', true);
            
            let newZoom = Math.min(this.currentZoom + this.zoomIncrement);

            this.tweens.add({
                targets: this.background,
                scaleX: newZoom,//{ from: this.background.scaleX, to: 1.5 },
                scaleY: newZoom, //from: this.background.scaleY, to: 1.5 },
                duration: this.animationDuration,
                ease: 'Linear',
                onStart: () => {
                },
                onComplete: () => {
                    this.currentZoom = newZoom;

                }
            });
        }
        if (!this.cameras.main.worldView.contains(this.dragon.x, this.dragon.y)) {
        // this.scene.start('gameOverScene')}
        this.gameover()
        }
    }
    //functions
    gameover(){
        console.log('gameOverScene')        
    }
    forward(){
        let newZoom = Phaser.Math.Clamp(this.background.scaleX + this.zoomSpeed, this.defaultZoom, this.maxZoom);
        this.background.setScale(newZoom);
    }
    
    dragonmove(){
        this.dragonSpeed = Phaser.Math.Between(150, 400)
        // this.player.anims.play("dragon-move", true)
        if (this.moving) {
            if (this.dragon.x < 900) {
                this.dragon.setVelocityX(this.dragonSpeed);
            } else if (this.dragon.x >= 900) {
                this.dragon.setVelocityX(0); // Stop the dragon when it reaches the leftmost point
                this.moving = false; // Stop moving left and get ready to move right
            }
        }    
        if (!this.moving){
          this.dragon.setVelocityX(-this.dragonSpeed)
          if (this.dragon.x < 300){
            this.moving=true
            }
        }   
    }

    jump_simulation() {
        this.jumpPeak = 30; // The peak height of the jump
        this.jumpSpeed = 1; // How fast the jump happens
        if (!this.isJumping) {
            this.isJumping = true;
            let peakReached = false;
            let jumpStep = 35
            this.time.addEvent({
                loop: true,
                callback: () => {
                    if (!peakReached) {
                        this.background.tilePositionY += jumpStep;
                        if (jumpStep <= this.jumpPeak) {
                            peakReached = true;
                        }
                    } else {
                        this.background.tilePositionY -= jumpStep;
                        if (this.background.tilePositionY <= 0) {
                            this.background.tilePositionY = 0;
                            this.isJumping = false;
                            peakReached = false;
                            jumpStep = this.jumpSpeed; // Reset for next jump
                            this.time.removeAllEvents(); // Stop the jumping loop
                        }
                    }
                    jumpStep *= 0.98; // Decrement to simulate gravity
                },
                delay: 20 // Adjust for faster or slower animation
            });
        }
    }
}