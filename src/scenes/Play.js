class Play extends Phaser.Scene {
    constructor() {
        super("play_scene");
        this.gameStart = false
        this.isJumping = false;
        this.growing = false;
        this.smackCount = 0;
        this.shakeAmount = 0; 
        this.shakeDuration = 0
        this.wobbleAmount = 0
        this.wobbleDuration = 1000
        this.scaleFactor = 0.997;

        
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
        this.dragon = this.add.sprite(400, 200, "dragon");
        this.dragon.setScale(.3)
        this.isMoving = true;
        this.moveDirection = 1;
        this.dragonmove()


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



    }

    update(time, delta){
        if (this.isMoving) {
            this.dragon.x += this.moveDirection * (this.horizontalSpeed * 20) * (delta / 1000);
            // console.log(this.dragon.x)
        }

        if(this.isMoving == 0){
            this.dragon.setScale(this.dragon.scaleX * this.scaleFactor, this.dragon.scaleY * this.scaleFactor);
        }
        //this.dragon.x = Phaser.Math.Clamp(this.dragon.x, 0, this.game.config.width);

        
        if(this.growing){
            this.dragon.setScale(this.dragon.scaleX / this.scaleFactor *1.001, this.dragon.scaleY / this.scaleFactor*1.001);
        }


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


        //arms tween
        if (Phaser.Input.Keyboard.JustDown(this.spaceBar) && this.isJumping == false) {
            this.isJumping = true
            this.arms.anims.play('use', true);
            this.HeartBeat.play();

            let newZoom = Math.min(this.currentZoom + this.zoomIncrement);
            
            // Increase the shake amount by the current increment
        
            this.tweens.add({
                targets: this.background,
                scaleX: newZoom,
                scaleY: newZoom,
                duration: this.animationDuration,
                ease: 'Linear',
                onStart: () => {
                    this.gameStart = true
                    this.growing = true
                    

                },
                onComplete: () => {
                    this.shake()
                    this.wobble()
                    this.speed()
                    console.log(`Current horizontal speed: ${this.horizontalSpeed}`)
                    this.currentZoom = newZoom;
                    this.dragon.clearTint();
                    this.arms.anims.play('run');
                    this.increaseScore();
                    this.growing = false
                    this.isJumping = false

                }
            });
        }
        
        //collision
        if (!this.cameras.main.worldView.contains(this.dragon.x+200, this.dragon.y+100)) {
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
        this.time.addEvent({
            delay: Phaser.Math.Between(1000, 2000),
            callback: () => {
                this.isMoving = Phaser.Math.Between(0, 1) === 1;
                if (this.isMoving) {
                    this.moveDirection = Phaser.Math.Between(0, 1) === 1 ? 1 : -1;
                }
                this.dragonmove();
            },
            callbackScope: this
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

    end(){
        this.scene.start('gameOverScene') 
    }

    increaseScore() {
        this.score += 1;
        this.scoreText.setText(`Smack count: ${this.score}`);
      }
    
    shake(){
        if(this.shakeAmount < .3){
            this.shakeAmount += 0.004; // Adjust the increment as needed
        }
        if (this.shakeDuration < 9000){
            this.shakeDuration += 1500
        }
        // Now apply the shake with the updated amount
        this.cameras.main.shake(this.shakeDuration, this.shakeAmount)
        

        // Log the current shake amount for debugging purposes
        console.log(`Current shake amount: ${this.shakeAmount}`);
    }

    wobble(){
        if (this.wobbleAmount == 0){
            this.wobbleAmount +=.01
        }
        else if (this.wobbleAmount > 0 && this.wobbleAmount < .3){
            this.wobbleAmount += .03
        }
        if (this.wobbleDuration > 100){
            this.wobbleDuration -= 100
        }
        this.wobbleTween = this.tweens.add({
                targets: this, // Change targets to this scene
                wobbleIntensity: { from: -this.wobbleAmount, to: this.wobbleAmount },
                duration: this.wobbleDuration,
                yoyo: true,
                repeat: -1,
                onUpdate: tween => {   
                    this.cameras.main.setRotation(tween.getValue()); 

                    if (this.border) {
                        this.border.setRotation(-tween.getValue());
                    }
                },
            });
            console.log(`Current wobble amount: ${this.wobbleAmount}`)
    }

    speed(){
        if (this.horizontalSpeed < 2){
            this.horizontalSpeed += 4
        }
        else if(this.horizontalSpeed < 20 && this.horizontalSpeed > 2){
            this.horizontalSpeed += 5
        }
        else if(this.horizontalSpeed >= 20 && this.horizontalSpeed < 140){
            this,this.horizontalSpeed += 20
        }
    }

}