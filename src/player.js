/* Written by Zachery Chin
 * Last-modified: 29 Apr 2011 11:54:38 AM
 * 
 * This file deals with the player entity and handling user input
 */


if(typeof(sw_game)==='undefined'){ sw_game = {};};
sw_game.Player={};

/***********DEFINE PLAYER CONTRLS***********/
Crafty.c('PlayerControls', {
  __move: {left:false, right:false, up:false, down:false},
  //Takes in 4 booleans representing cardinal directions and returns a resulting vector
  arrowsToVector: function (left, right, up, down){
    //if
  },
  PlayerControls: function(){
    var move=this.__move;
    this.bind('enterframe', function(){
      //calculate the control vector based on the state of the inputs
    }).bind('keydown', function(e){
      if(e.keyCode===Crafty.keys.RIGHT_ARROW) move.right=true;
      if(e.keyCode===Crafty.keys.LEFT_ARROW) move.left=true;
      if(e.keyCode===Crafty.keys.UP_ARROW) move.up=true;
      if(e.keyCode===Crafty.keys.DOWN_ARROW) move.down=true;
      if(e.keyCode===Crafty.keys.A){ //A debug button just to get the ship status
        console.log("\nDEBUG: GETTING STATUS OF CONTROLS AND ATTACHED ENTITY");
        console.log("up:"+this.__move.up+" down:"+this.__move.down+" left:"+this.__move.left+" right:"+this.__move.right);
        //CHECKING VALUES OF THRUST VECTORS (BASED ON KEY INPUTS)
        //console.log("left:"+move.left+" up:"+move.up+" down:"+move.down+" right:"+move.right);
        //console.log("posx:"+this.x+" posy:"+this.y+" velx:"+this._velX+" vely:"+this._velY);
        //console.log("thrustX:"+this._thrustX+" thrustY:"+this._thrustY);
      }
      //this.preventTypeaheadFind(e);
      //console.log('keydown event');
    }).bind('keyup', function(e){
      if(e.keyCode===Crafty.keys.RIGHT_ARROW) move.right=false;
      if(e.keyCode===Crafty.keys.LEFT_ARROW) move.left=false;
      if(e.keyCode===Crafty.keys.UP_ARROW) move.up=false;
      if(e.keyCode===Crafty.keys.DOWN_ARROW) move.down=false;
      //this.preventTypeaheadFind(e);
      //console.log('keyup event');
    });
    return this;
  }
});
/******END CONTROLS ********/

//Create and initialize the player entity
sw_game.Player.createPlayer = function (){
  var playerShip = Crafty.e("2D, DOM, spr_player, Controls, PlayerControls, SWShip, SWPhysics, Collision")
    .attr({x: 40, y: 50, })
    .SWShip(sw_game.Ship.SHIPS['standard'])
    .SWPhysics(sw_game.Ship.SHIPS['standard']['mass'])
    .PlayerControls();
  playerShip.origin(16,16); //set the center of the ship for rotation purposes
  return playerShip;
};

sw_game.dependencies.loaded('player');
