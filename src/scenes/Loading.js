class Load extends Phaser.Scene {
    constructor() {
        super('load_scene')
    }
    preload(){
        this.load.path = './assets'
    
    }
    create(){
        this.anims.create({
            key:"dragon-move",
            framerate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('dragon-move', {start: 0, end: 10}),
        })

        this.anims.create({
            key:"dragon-idle",
            framerate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('dragon-move', {start: 10, end: 20}),
        })
    }
}