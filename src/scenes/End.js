class End extends Phaser.Scene{
    constructor(){
        super("gameOverScene")
    }

    preload(){
        this.load.image("gover", "assets/gover.jpg")
        this.load.audio('EndMusic', 'assets/EndMusic.mp3')
    }
    create(){
        
        
        
        this.EndMusic = this.sound.add("EndMusic")
        this.EndMusic.play()

        this.gover = this.add.image(0, 0, 'gover').setOrigin(0,0)

        this.add.text(this.game.config.width-500, 600, 'Press R to Restart', {
            fontSize: '30px',
            fill: '#fff',
            align: 'center'
          }).setOrigin(1, 0);
        
          this.input.keyboard.on("keydown-R", () => {
            this.EndMusic.stop()
              this.scene.start("load_scene")
            });
        }
        
          
}
