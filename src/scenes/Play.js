class Play extends Phaser.Scene {
    constructor() {
        super("play_scene");
        this.gameStart = false
        this.isJumping = false;
        this.growing = false;
        this.smackCount = 0;
        this.shakeInc = 0.001; 
        this.shakeAmount = 0.001; 
        this.scaleFactor = 0.998;
        this.wobbleIntensity = 0.01 ;

        
    }
 
    preload(){
        this.load.image("background", "assets/background.png")
        this.load.image("dragon", "assets/dragon.png")
        this.load.image("border", "assets/border.png") 
        this.load.image("smack", "assets/smack.png");
        //audio 
        this.load.audio("HeartBeat", "assets/HeartBeat.wav")
        this.load.audio("game", "assets/game.wav")
    }   
    create(){
        const gameWidth = this.cameras.main.width;
        const gameHeight = this.cameras.main.height;
        this.background = this.add.tileSprite(0, 0, gameWidth, gameHeight, 'background').setOrigin(.5, .5);
        this.background.setPosition(gameWidth / 2, gameHeight / 2);

        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        //score
        this.score = 0;

        this.scoreText = this.add.text(110, 32, `Smack count: ${this.score}`, { fontSize: '32px', fill: '#fff' });

        // Animation details
        this.animationDuration = (10 / 10) * 1000; // Duration in millisecond}

        //dragon
        this.dragon = this.physics.add.sprite(300, 200, "dragon");
        this.dragon.setScale(.3)
        this.dragonSpeed = 100;


        this.arms = this.add.sprite(config.width / 2, config.height/ 1.15, 'arms'); 
        this.arms.setScale(10)
        this.arms.setScrollFactor(0);

        this.border = this.add.sprite(config.width / 2, config.height/2, 'border');
        this.border.scaleY = 1.2
        this.border.setScrollFactor(0);
        //syringe

        //smack
        this.smack = this.add.sprite(config.width / 1.15, config.height/ 1.3, 'smack'); 
        this.smack.setScale(.5)
        this.smack.setScrollFactor(0)
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

        //audio
        this.game = this.sound.add("game")
        this.game.play()
        this.HeartBeat = this.sound.add("HeartBeat", {loop: true}, {volume: 50})



        //dragon tween
        //state machine for dragon
        //get world point
        //physics

    }

    update(){
        
        
        if (!this.growing){
        this.dragon.setScale(this.dragon.scaleX * this.scaleFactor, this.dragon.scaleY * this.scaleFactor);
        }
        else if(this.growing){
            this.dragon.setScale(this.dragon.scaleX / this.scaleFactor *1.001, this.dragon.scaleY / this.scaleFactor*1.001);
        }

        // if (this.cursors.left.isDown) {
        //     this.background.tilePositionX -= this.horizontalSpeed;
        // }
    
        // if (this.cursors.right.isDown) {
        //     this.background.tilePositionX += this.horizontalSpeed;
        // }

        if (this.cursors.left.isDown) {
            this.cameras.main.scrollX -= this.horizontalSpeed;
        }
        if (this.cursors.right.isDown) {
            this.cameras.main.scrollX += this.horizontalSpeed;
        }


        if (this.cursors.up.isDown){
            //this.jump_simulation()
            this.forward()
            this.HeartBeat.stop()
        }
        if (this.cursors.down.isDown){
            this.arms.anims.play('use', true);
            this.forward()
        }

        // this.dragonmove()

        //arms tween
        if (Phaser.Input.Keyboard.JustDown(this.spaceBar) && this.isJumping == false) {
            this.isJumping = true
            this.arms.anims.play('use', true);
            this.HeartBeat.play();

            let newZoom = Math.min(this.currentZoom + this.zoomIncrement);
            
            // Increase the shake amount by the current increment
            this.shakeAmount += this.shakeInc;
        
            this.tweens.add({
                targets: this.background,
                scaleX: newZoom,
                scaleY: newZoom,
                duration: this.animationDuration,
                ease: 'Linear',
                onStart: () => {
                    this.gameStart = true
                    this.growing = true

                    const timeline = this.tweens.timeline({
                        loop: -1, 
                        tweens: [
                            {
                                targets: this.dragon,
                                angle: 30,  
                                x: this.dragon.x + 600,
                                duration: 3000,
                            },
                            {
                                targets: this.dragon,
                                x: this.dragon.x,
                                duration: 1000,
                                angle: 0
                            },
                            {
                                targets: this.dragon,
                                x: this.dragon.x-200,
                                duration: 1500,
                                angle: -15
                            },
                            {
                                targets: this.dragon,
                                x: this.dragon.x,
                                duration: 1000,
                                angle: 0
                            }
                        ]
                    });

                    
                    //this.dragon.setTint(0xff0000);
                },
                onComplete: () => {
                    this.currentZoom = newZoom;
                    this.cameras.main.shake(50000, this.shakeAmount); // Use updated shake amount here
                    this.dragon.clearTint();
                    this.arms.anims.play('run');
                    this.startWobbleEffect();
                    this.increaseScore();
                    this.growing = false
                    this.isJumping = false

                }
            });

        }

        if (this.score == 2 ){
            this.horizontalSpeed = 3
            this.shakeAmount = .005
            this.shakeInc = .005
            this.wobbleIntensity = 0.03
        }
        else if(this.score == 3){
            this.horizontalSpeed = 5
        }
        else if(this.score == 4){
            this.horizontalSpeed = 7
        }
        else if(this.score == 5){
            this.horizontalSpeed = 9
        }
        else if(this.score == 6){
            this.horizontalSpeed = 11
        }

        //collision
        if (!this.cameras.main.worldView.contains(this.dragon.x, this.dragon.y)) {
        this.end()
        }

        if (this.dragon.scaleY < .1) {
            this.end()
        }
    }
    //functions
    forward(){
        let newZoom = Phaser.Math.Clamp(this.background.scaleX + this.zoomSpeed, this.defaultZoom, this.maxZoom);
        this.background.setScale(newZoom);
    }
    
    dragonmove(){
        const newX = Phaser.Math.Between(100, gameWidth - 100); 
    const newDuration = Phaser.Math.Between(1000, 3000); 
    const newAngle = Phaser.Math.Between(-20, 20); 

    this.tweens.add({
        targets: this.dragon,
        x: newX,
        duration: newDuration,
        angle: newAngle,
        onComplete: () => {
            this.dragonmove(); 
        }
    });
    }


    jump_simulation() {
        this.jumpPeak = -30; // The peak height of the jump
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
    
    startWobbleEffect() {
        if (!this.wobbleTween) {
            this.wobbleTween = this.tweens.add({
                targets: this, // Change targets to this scene
                wobbleIntensity: { from: -this.wobbleIntensity, to: this.wobbleIntensity },
                duration: 1000,
                yoyo: true,
                repeat: -1,
                onUpdate: tween => {
                    this.cameras.main.setRotation(tween.getValue()); // Apply rotation based on tween value
                }
            });
        }  
    }
    

    end(){
        this.scene.start('gameOverScene') 
    }

    increaseScore() {
        this.score += 1;
        this.scoreText.setText(`Smack count: ${this.score}`);
      }
}