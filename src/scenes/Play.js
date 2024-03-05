class Play extends Phaser.Scene {
    constructor() {
        super("play_scene")
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


        this.cursors = this.input.keyboard.createCursorKeys();
        this.horizontalSpeed = 1
        this.zoomSpeed = 0.001; // How quickly the camera zooms in
        this.maxZoom = 3; // Maximum zoom level
        this.defaultZoom = 1; // Normal zoom level

    }

    update(){
        if (this.cursors.left.isDown) {
            this.background.tilePositionX -= this.horizontalSpeed;
            this.zoom()
            this.dragonmove()
        }
    
        if (this.cursors.right.isDown) {
            this.background.tilePositionX += this.horizontalSpeed;
            this.zoom()
        }

    }

    zoom(){
        let currentZoom = this.cameras.main.zoom;
        let newZoom = Phaser.Math.Clamp(currentZoom + this.zoomSpeed, this.defaultZoom, this.maxZoom);
        this.cameras.main.setZoom(newZoom);
    }
    
    dragonmove(){
        this.dragonSpeed = 200
        this.player.anims.play("dragon-move", true)
        // this.dragon.setVelocityX(this.dragonSpeed)
        // this.dragon.setVelocityX(-this.dragonSpeed)
    }
}