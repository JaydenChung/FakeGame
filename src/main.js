//Jayden Chung

//Ali Taquie

//tween timeline, animations, spritesheets, camera effects (color, wobble, shake), text

//Creative tilt
//Created First Person game in a 2d game engine
//This resulted in the primary movement and interactions of the game
//being based off camera manipulation and simulating  first person movement
//This resulted in using the entire camera frame and not actually having a character as a sprite with physics
//I had to think of a way to make the game fun without using collison which was a fun challege
//I also learned Photoshop and Aesperite in the process of creating the game

//Paticularly proud of creating a first person game despite the lack of tools
//While simulating first-person mechanics we realized the ability to fix specific problems if we wern't in phaser
//example, trying to keep the border and specific sprites being effected by camera diorientation
var config = {
    type: Phaser.AUTO,
    width: 1300,
    height: 650,
    zoom: 1,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 0},
            debug: true,
        }
    },
    scene: [Loading, Menu, Credit, Rules, Play, End] 
}
var game = new Phaser.Game(config)
