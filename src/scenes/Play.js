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
        this.scaleFactor = 0.998;

        
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

        //dragon
        this.dragon = this.add.sprite(600, 200, "dragon");
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
        this.zoomSpeed = .01; 
        this.maxZoom = 3; 
        this.defaultZoom = 1; 
        this.currentZoom = 1; 
        this.zoomIncrement = 0.2;

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
        }

        if(this.isMoving == 0){
            this.dragon.setScale(this.dragon.scaleX * this.scaleFactor, this.dragon.scaleY * this.scaleFactor);
        }
        
        if(this.growing){
            this.dragon.setScale(this.dragon.scaleX / this.scaleFactor * 1.001, this.dragon.scaleY / this.scaleFactor * 1.001);
        }


        if (this.cursors.left.isDown) {
            this.cameras.main.scrollX -= this.horizontalSpeed;
        }
        if (this.cursors.right.isDown) {
            this.cameras.main.scrollX += this.horizontalSpeed;
        }

        if (this.cursors.down.isDown){
            this.arms.anims.play('run');
            this.forward()
        }


        //arms tween
        if (Phaser.Input.Keyboard.JustDown(this.spaceBar) && this.isJumping == false) {
            this.isJumping = true
            this.arms.anims.play('use', true);
            this.HeartBeat.play();
            let useAnimation = this.arms.anims.play('use', true);

            useAnimation.on('animationcomplete', () => {
                let newZoom = Math.min(this.currentZoom + this.zoomIncrement); // Ensure this logic is correct; previously missing argument in Math.min()
                this.tweens.add({
                    targets: this.background,
                    scaleX: newZoom,
                    scaleY: newZoom,
                    duration: 1000, // Duration of the zoom effect
                    ease: 'Linear',
                    onStart: () => {
                        this.gameStart = true;
                        this.growing = true;
                    },
                    onComplete: () => {
                        this.shake();
                        this.color();
                        this.wobble();
                        this.speed();
                        this.currentZoom = newZoom;
                        this.dragon.clearTint();
                        this.arms.anims.play('run');
                        this.increaseScore();
                        this.growing = false;
                        this.isJumping = false;
                        this.forward()
                    }
                });
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
        const scaleInc = 0.001; // Increment of scale for each call

    if (!this.scaleEvent) { // Prevent multiple scale events from being created
        this.scaleEvent = this.time.addEvent({
            callback: () => {
                // Get the current scale of the background
                let currentScaleX = this.background.scaleX;
                let currentScaleY = this.background.scaleY;

                // Calculate the new scale
                let newScaleX = currentScaleX + scaleInc;
                let newScaleY = currentScaleY + scaleInc;

                // Set the new scale to the background
                this.background.setScale(newScaleX, newScaleY);
            },
            loop: true // Keep looping the event
        });
    }
}
    
    dragonmove(){
        this.time.addEvent({
            delay: Phaser.Math.Between(500, 2000),
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

        this.color(this.shakeDuration);
        

        // Log the current shake amount for debugging purposes
        console.log(`Current shake amount: ${this.shakeAmount}`);
    }

    color(){
        if(this.score <= 2){
            this.background.setTint(0xccffcc); //light green
        }
        else if(this.score >2 && this.score <= 4){
            this.background.setTint(0xffffcc); //light yellow
        }
        else if(this.score >4 && this.score <= 5){
            this.background.setTint(0xdddd99); //yellow
        }
        else if(this.score >5 && this.score <=7 ){
            this.background.setTint(0xff3333) //light red
        }
        else if(this.score > 7){
            this.background.setTint(0xff0000) //red
        }   
        this.time.delayedCall(this.shakeDuration, () => {
                this.background.clearTint();
        });
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