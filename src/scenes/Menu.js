class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
  
    preload() {
      this.load.image("menuImage", "assets/FakeMenu.png");
      //this.load.audio("MenuMusic", "assets/MenuMusic.wav")
    }
  
    create() {
    //   this.MenuMusic = this.sound.add("MenuMusic")
    //   this.MenuMusic.play()
      const menuImage = this.add.image(0, 0, "menuImage").setOrigin(0, 0);
  
      // Scale the menu image to fit the screen
      menuImage.displayWidth = this.game.config.width;
      menuImage.displayHeight = this.game.config.height;
  
      this.add.text(this.game.config.width-250, 20, 'Dragon Chase', {
        fontSize: '110px',
        fill: '#000000',
        align: 'center'
      }).setOrigin(1, 0);

      this.add.text(this.game.config.width-650, 200, 'Press \nspace to', {
        fontSize: '60px',
        fill: '#000000',
        align: 'center'
      }).setOrigin(1, 0);

      this.add.text(this.game.config.width-1100, 500, 'Press [c] \nfor credits', {
        fontSize: '30px',
        fill: '#FF0000',
        align: 'center'
      }).setOrigin(1, 0);

      this.add.text(this.game.config.width-1111, 570, 'Press [r] \nfor rules', {
        fontSize: '30px',
        fill: '#FF0000',
        align: 'center'
      }).setOrigin(1, 0);
  
      // Start the game on spacebar press
      this.input.keyboard.on("keydown-SPACE", () => {
        //this.MenuMusic.stop()
        this.scene.start("play_scene");
      });
    }
}