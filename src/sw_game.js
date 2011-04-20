/*
 Written by: Zachery Chin
 Last-modified: 19 Apr 2011 07:33:00 PM


 Shooter game: 
 A 2d top scrolling shooter in the gradius vein.
 Very simple, just to test the capabilities and become
 familiar with Crafty


 TODO: 
   - Seems to be a problem animating the bullet.  I believe it may be
   that I can't use two different sprite files, let's try merging
   all the assets into a single image.

   - Ensure bullets are destroyed if they exit the screen.
*******************************/

if(typeof(sw_game)==='undefined'){ sw_game = {};};

/*CONSTANTS*/

var SPR_PLAYER_SHIP = "assets/player01.png"; //Note: paths are relative to the html file which includes this
//var SPR_BULLET01 = "bullet01_0.png"; //2 frames
var SPR_ASSETS = "assets/shooter_assets01.png";
var gameWidth; //global, this might need to move
var gameHeight;
/*******************END CONSTANTS***************/

window.onload=function(){
 //Perhaps I should init the canvas size in accordance with the 
 //current window size.
  gameHeight=window.innerHeight-4;
  gameWidth=window.innerWidth-4;
  Crafty.init(60, gameWidth, gameHeight); //-4 for the border
  Crafty.canvas();

  Crafty.sprite(32, SPR_ASSETS, {
    player: [0,0],
    shots: [0,1]
  });

  //function generateWorld(){}; //define the stage
  Crafty.scene("loading", function() {
    // Load takes an array of assets and a callback when complete
    Crafty.load([SPR_PLAYER_SHIP], function() {
      Crafty.scene("main"); //when everything is loaded, run the main scene
    });
  
      // Black background with some loading text
    Crafty.background("#000");
    Crafty.e("2D, DOM, text").attr({w: 100, h: 20, x: 150, y: 120})
      .text("Loading")
      .css({"text-align": "center"});
  });


  Crafty.scene("loading"); //run the loading scene
  Crafty.scene("main", function(){ //define the main scene
    //console.log("DEBUG: Appearing in main function");
    //generateWorld(); //init the stage
    var player=sw_game.player.createPlayer();
    //console.log("DEBUG: PLayer has been created");
  });
};

sw_game.dependencies.included('sw_game');

