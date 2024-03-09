var config = {
    type: Phaser.AUTO,
    width: 1300,
    height: 650,
    zoom: 1.1,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 0},
            debug: true,
        }
    },
    scene: [Load, Play] 
}
var game = new Phaser.Game(config)
