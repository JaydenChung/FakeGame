class End extends Phaser.Scene{
    constructor(){
        super("gameOverScene")
    }

    preload(){
        this.load.image("end", "assets/end.jpg")
    }
    create(){
        this.cameras.main.setBackgroundColor('#f5624c');
        //display game over
        let gameOverConfig = {
            fontFamily: 'fantasy',
            fontSize: '36px',
            backgroundColor: '#f5624c',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        
        this.EndMusic = this.sound.add("EndMusic")
        this.EndMusic.play()

        this.end= this.add.image(0, 0, 'end').setOrigin(0,0);

        this.add.text(this.game.config.width-500, 600, 'Press R to Restart', {
            fontSize: '30px',
            fill: '#fff',
            align: 'center'
          }).setOrigin(1, 0);
        
          this.input.keyboard.on("keydown-R", () => {
              this.scene.start("load_scene")
            });
        }
        
          
}
