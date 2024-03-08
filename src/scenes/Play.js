class Play extends Phaser.Scene {
    constructor() {
        super("play_scene");
        this.isJumping = false;
    }

    preload(){
        this.load.image("background", "assets/fake_background.png")
        this.load.image("dragon", "assets/dragon.png")
    }   
    create(){
        const gameWidth = this.cameras.main.width;
        const gameHeight = this.cameras.main.height;
        this.background = this.add.tileSprite(0, 0, gameWidth, gameHeight, 'background').setOrigin(0, 0);

        //dragon
        this.dragon = this.physics.add.sprite(config.width / 3, config.height / 3, "dragon");
        this.dragon.setScale(.3)

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
        this.zoomSpeed = 0.001; // How quickly the camera zooms in
        this.maxZoom = 3; // Maximum zoom level
        this.defaultZoom = 1; // Normal zoom level

        //use key
        const keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.keySpace)
        this.KeySpace = keySpace
    }

    update(){
        if (this.cursors.left.isDown) {
            this.background.tilePositionX -= this.horizontalSpeed;
            this.zoom()
        }
    
        if (this.cursors.right.isDown) {
            this.background.tilePositionX += this.horizontalSpeed;
            this.zoom()
        }
        if (this.cursors.up.isDown){
            this.jump_simulation()
        }
        this.dragonmove()

        //use ke
        // if (Phaser.Input.Keyboard.JustDown(this.KeySpace) && sCount > 0){
        //     this.hands.anims.play("use", true)
        //     sCount-=1
        //}
    }

    //functions
    zoom(){
        let currentZoom = this.cameras.main.zoom;
        let newZoom = Phaser.Math.Clamp(currentZoom + this.zoomSpeed, this.defaultZoom, this.maxZoom);
        this.cameras.main.setZoom(newZoom);
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
        else{
            this.dragon.setVelocityX(0);
        }
        
        
        if (!this.moving){
          this.dragon.setVelocityX(-this.dragonSpeed)
          if (this.dragon.x < 300){
            this.moving=true
            }
        }   
        else{
            this.dragon.setVelocityX(0);
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