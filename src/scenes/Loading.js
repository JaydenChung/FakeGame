class Loading extends Phaser.Scene {
    constructor() {
        super('load_scene')
    }
    preload(){
        this.load.path = './assets/'

        this.load.audio('EndMusic', 'EndMusic.mp3')

        //preload anims
        this.load.spritesheet('dragon', 'dragon.png', {
            frameWidth: 905,
            frameHeight: 791
        })

        this.load.spritesheet('arms', 'RealArm.png', {
            frameWidth: 1280,
            frameHeight: 534
        })

        this.load.spritesheet('smack', 'Smack.png', {
            frameWidth: 200,
            frameHeight: 306
        })
    }
    create(){
        
        this.anims.create({
            key:"dragon_fly",
            framerate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('dragon', {start: 0, end: 2}),
        })

        //hand animations
        this.anims.create({
            key: "use",
            frameRate: 6,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('arms', {start: 0, end: 2}),
        });
        
        this.anims.create({
            key: "run",
            frameRate: 1,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('arms', {start: 0, end: 1}),
        });
        
        this.anims.create({
            key: "jar1",
            frames: this.anims.generateFrameNumbers('smack', {start: 1, end: 1}),
        });
        this.anims.create({
            key: "jar2",
            frames: this.anims.generateFrameNumbers('smack', {start: 2, end: 2}),
        });
        this.anims.create({
            key: "jar3",
            frames: this.anims.generateFrameNumbers('smack', {start: 3, end: 3}),
        });
        
        this.scene.start('menuScene')
    }
}