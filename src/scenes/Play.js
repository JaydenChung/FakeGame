class Play extends Phaser.Scene {
    constructor() {
        super("play_scene");
        this.isJumping = false;
        this.smackCount = 0;
        this.shakeInc = 0.001; 
        this.shakeAmount = 0.001; 
    }
 
    preload(){
        this.load.image("background", "assets/fake_background.png")
        this.load.image("dragon", "assets/dragon.png")
        this.load.image("border", "assets/border.png")

        //audio
        this.load.audio("HeartBeat", "assets/HeartBeat.wav")
        this.load.audio("game", "assets/game.wav")
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

        this.arms = this.add.sprite(config.width / 2, config.height/ 1.2, 'arms'); 
        this.arms.setScale(12)

        this.border = this.add.sprite(config.width / 2, config.height/ 2, 'border');
        //syringe

        //smack

        //dragon tween
        const timeline = this.tweens.timeline({
            loop: -1, 
            tweens: [
                {
                    targets: this.dragon,
                    x: gameWidth - 300, // Assuming gameWidth is defined
                    duration: 2000,
                    angle: 20  
                },
                {
                    targets: this.dragon,
                    x: gameWidth-600,
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

    update(){

        if (this.cursors.left.isDown) {
            this.background.tilePositionX -= this.horizontalSpeed;
        }
    
        if (this.cursors.right.isDown) {
            this.background.tilePositionX += this.horizontalSpeed;
        }
        if (this.cursors.up.isDown){
            this.forward()
            this.HeartBeat.stop()
        }
        if (this.cursors.down.isDown){
            this.arms.anims.play('use', true);
            this.forward()
        }

        // this.dragonmove()

        //arms tween
        if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
            this.arms.anims.play('use', true);
            this.HeartBeat.play();

            this.startColorShift();

            
            let newZoom = Math.min(this.currentZoom + this.zoomIncrement);
            
            // Increase the shake amount by the current increment
            this.shakeAmount += this.shakeInc;
        
            this.tweens.add({
                targets: this.background,
                scaleX: newZoom,
                scaleY: newZoom,
                duration: this.animationDuration,
                ease: 'Linear',
                onComplete: () => {
                    this.currentZoom = newZoom;
                    this.cameras.main.shake(5000, this.shakeAmount); // Use updated shake amount here
                    this.arms.anims.play('run');
                    this.startWobbleEffect();
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
    startColorShift() {
        if (!this.colorShiftTween) { // Check if the tween doesn't already exist
            this.colorShiftTween = this.tweens.addCounter({
                from: 0,
                to: 100,
                duration: 5000, // Duration of one complete color cycle
                repeat: -1, // Loop indefinitely
                onUpdate: tween => {
                    const value = tween.getValue();
                    const color = Phaser.Display.Color.Interpolate.ColorWithColor(
                        Phaser.Display.Color.RGBStringToColor('#ff0000'), // Start color: Red
                        Phaser.Display.Color.RGBStringToColor('#0000ff'), // End color: Blue
                        100, // Steps
                        value // Current step
                    );
                    this.cameras.main.setTint(Phaser.Display.Color.GetColor(color.r, color.g, color.b));
                }
            });
        }
    }
    
    startWobbleEffect() {
        if (!this.wobbleTween) { // Check if the tween doesn't already exist
            this.wobbleTween = this.tweens.add({
                targets: { wobble: 0 },
                props: { wobble: { value: 0.01, ease: 'Sine.easeInOut' } }, // The wobble angle in radians
                duration: 500, // Half-period of one wobble
                yoyo: true, // Go back and forth
                repeat: -1, // Repeat indefinitely
                onUpdate: tween => {
                    const value = tween.getValue();
                    this.cameras.main.setRotation(value); // Apply rotation based on tween value
                }
            });
        }
    }
}