class Credit extends Phaser.Scene {
    constructor() {
      super("creditScene");
    }
  
    preload() {
      this.load.image("ruleImage", "assets/southpark.png");
      //this.load.audio("MenuMusic", "assets/MenuMusic.wav")
    }
  
    create() {
    //   this.MenuMusic = this.sound.add("MenuMusic")
    //   this.MenuMusic.play()
      const menuImage = this.add.image(0, 0, "ruleImage").setOrigin(0, 0);
  
      // Scale the menu image to fit the screen
      menuImage.displayWidth = this.game.config.width;
      menuImage.displayHeight = this.game.config.height;

      this.add.text(this.game.config.width-520, 1, 'Credits', {
        fontSize: '40px',
        fill: '#000000',
        align: 'left'
      }).setOrigin(1, 0);
  
      this.add.text(this.game.config.width-900, 170, 
        ' All sound effects and music found on https://opengameart.org/ \n\n Artwork originally created on Aesperite or Photoshop\n\n Majority of programming done by Jayden Chung, \n Created camera controls and distortion functions, \n Created scenes and tweens\n\n Programming done by Ali Taquie, \n Created animations, spritesheets, \n and github collaboration',{
            fontSize: '20px',
            fill: '#000000',
        }).setOrigin(0.5)

      this.add.text(this.game.config.width-1000, 600, 'Press Space for Menu', {
        fontSize: '20px',
        fill: '#FF0000',
        align: 'left'
      }).setOrigin(1, 0);

      this.input.keyboard.on("keydown-SPACE", () => {
        this.scene.start("menuScene");
      });
    }
}