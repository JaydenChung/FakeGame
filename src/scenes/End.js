class End extends Phaser.Scene{
    constructor(){
        super("gameOverScene")
    }

    preload(){
    }
    create(){
        this.EndMusic = this.sound.add("EndMusic")
        this.EndMusic.play()
//         //displaygameover
//         const gameOverImage = this.add.image(0, 0, 'gameOver').setOrigin(0,0);

        this.add.text(this.game.config.width-250, 350, 'The dragon got away :(', {
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
