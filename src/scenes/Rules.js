class Rules extends Phaser.Scene {
    constructor() {
      super("ruleScene");
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

      this.add.text(this.game.config.width-520, 1, 'rules', {
        fontSize: '40px',
        fill: '#000000',
        align: 'left'
      }).setOrigin(1, 0);
  
      this.add.text(this.game.config.width-520, 50, ' Dragon Chase is based off a game shown in South Park.\n\n If the Dragon flies off screen or gets too far away you loose!\n Use the left and right arrow keys to look to the left and right\n\n Press the spacebar to get smacked and move forward.\n\n But be careful each time you use you will become more\n disoriented and the dragon will move faster \n\n fill your smack meter to the max \n and dont let the dragon get away!', {
        fontSize: '20px',
        fill: '#000000',
        align: 'left'
      }).setOrigin(1, 0);

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