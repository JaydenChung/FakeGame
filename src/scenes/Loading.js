class Load extends Phaser.Scene {
    constructor() {
        super('load_scene')
    }
    preload(){
        this.load.path = './assets'

        //preload anims
        this.load.spritesheet('dragon', 'dragon-sheet.png', {
            frameWidth: 32,
            frameHeight: 32
        })

        this.load.spritesheet('hands', 'hand-sheet.png', {
            frameWidth: 32,
            frameHeight: 32
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
            key:"use",
            framerate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('hands', {start: 0, end: 10}),
        })
        this.scene.start('play_scene')
    }
}