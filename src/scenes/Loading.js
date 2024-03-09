class Load extends Phaser.Scene {
    constructor() {
        super('load_scene')
    }
    preload(){
        this.load.path = './assets/'

        //preload anims
        // this.load.spritesheet('dragon', 'dragon-sheet.png', {
        //     frameWidth: 32,
        //     frameHeight: 32
        // })

        this.load.spritesheet('hands', 'arms.png', {
            frameWidth: 64,
            frameHeight: 64
        })

        this.load.spritesheet('arm', 'arms_running.png', {
            frameWidth: 64,
            frameHeight: 64
        })

        //preload audio

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
            frameRate: 4,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('hands', {start: 0, end: 4}),
        });
        
        this.anims.create({
            key: "run",
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('arm', {start: 0, end: 4}),
        });
        
        
        
        this.scene.start('play_scene')
    }
}