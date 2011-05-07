/*
 Written by: Zachery Chin
 Last-modified: 05 May 2011 02:01:47 PM


 Shooter game: 
 A 2d top scrolling shooter in the gradius vein.
 Very simple, just to test the capabilities and become
 familiar with Crafty

*******************************/
//alert('checking for crafty' + typeof(Crafty));

if(typeof(sw_game)==='undefined'){ sw_game = {};};

/*CONSTANTS*/
sw_game.FRAMERATE = 60; //in FPS
//sw_game.TIMESTEP = 0.0166667; // 1/FRAMERATE
sw_game.TIMESTEP = 1/sw_game.FRAMERATE;
//sw_game.frameCount = 0; // no need for this, crafty keeps track with Crafty.frame()


var SPR_PLAYER_SHIP = "assets/player01.png"; //Note: paths are relative to the html file which includes this
//var SPR_BULLET01 = "bullet01_0.png"; //2 frames
var SPR_ASSETS = "assets/shooter_assets01.png";
var gameWidth; //global, this might need to move
var gameHeight;

/*******************END CONSTANTS***************/

window.onload=function(){
 //Perhaps I should init the canvas size in accordance with the 
 //current window size.
  gameHeight=window.innerHeight-4; //-4 for the border
  gameWidth=window.innerWidth-4;
  //Crafty.init(gameWidth, gameHeight);
  Crafty.init(sw_game.FRAMERATE, gameWidth, gameHeight);
  Crafty.canvas();

  //can we move this outside of window.onload?
  Crafty.sprite(32, SPR_ASSETS, {
    spr_player: [0,0],
    spr_shots: [0,1]
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
    var player=sw_game.Player.createPlayer();
    //console.log("DEBUG: PLayer has been created");
  });
};

sw_game.dependencies.included('sw_game');

