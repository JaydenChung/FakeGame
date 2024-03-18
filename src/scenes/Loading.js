class Load extends Phaser.Scene {
    constructor() {
        super('load_scene')
    }
    preload(){
        this.load.path = './assets/'

        this.load.audio('EndMusic', 'EndMusic.mp3')

        //preload anims

        this.load.spritesheet('arms', 'arms_spritesheet.png', {
            frameWidth: 62.5,
            frameHeight: 40
        })
    }
    create(){
        
        this.anims.create({
            key:"dragon-move",
            framerate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('dragon', {start: 0, end: 10}),
        })

        this.anims.create({
            key:"dragon-idle",
            framerate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('dragon', {start: 10, end: 20}),
        })

        //hand animations
        this.anims.create({
            key: "use",
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('arms', {start: 4, end: 7}),
        });
        
        this.anims.create({
            key: "run",
            frameRate: 6,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('arms', {start: 3, end: 0}),
        });
        
        
        
        this.scene.start('play_scene')
    }
}