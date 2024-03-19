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

        this.add.text(this.game.config.width-400, 200, 'GAME OVER!', {
            fontSize: '62px',
            fill: '#fff',
            align: 'center'
          }).setOrigin(1, 0);

        this.add.text(this.game.config.width-100, 300, 'The dragon managed to escape!', {
            fontSize: '62px',
            fill: '#fff',
            align: 'center'
          }).setOrigin(1, 0);
        
        this.add.text(this.game.config.width-255, 400, 'Press R to Restart', {
            fontSize: '62px',
            fill: '#fff',
            align: 'center'
          }).setOrigin(1, 0);

        this.add.text(this.game.config.width-225, 500, 'Press C for credits', {
            fontSize: '62px',
            fill: '#fff',
            align: 'center'
          }).setOrigin(1, 0);
        
        

          
    }
}

//           this.add.text(this.game.config.width - 20, 20, 'Press R to Restart', {
//             fontSize: '32px',
//             fill: '#fff',
//             align: 'right'
//           }).setOrigin(1, 0);

//           this.add.text(this.game.config.width - 20, 70, 'Press C for credits', {
//             fontSize: '24px',
//             fill: '#fff',
//             align: 'right'
//           }).setOrigin(1, 0);

//         //create R key for update
//         const KeyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

//         this.KeyR = KeyR

//         const KeyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

//         this.KeyC = KeyC
//     }   
//     update(){
//         if (Phaser.Input.Keyboard.JustDown(this.KeyR)){
//             this.scene.start('play_scene')
//         }
//         if (Phaser.Input.Keyboard.JustDown(this.KeyC)){
//             this.scene.start('creditScene')
//         }
//     }
// }


