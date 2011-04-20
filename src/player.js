/* Written by Zachery Chin
 * Last-modified: 19 Apr 2011 07:46:28 PM
 * This file deals with the player entity and handling user input
 */


if(typeof(sw_game)==='undefined'){ sw_game = {};};
sw_game.player={};

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
      if(e.keyCode===Crafty.keys.RA) move.right=true;
      if(e.keyCode===Crafty.keys.LA) move.left=true;
      if(e.keyCode===Crafty.keys.UA) move.up=true;
      if(e.keyCode===Crafty.keys.DA) move.down=true;
      if(e.keyCode===Crafty.keys.A){ //A debug button just to get the ship status
        //console.log("\nDEBUG: GETTING STATUS OF CONTROLS AND ATTACHED ENTITY");
        //console.log("up:"+this.__move.up+" down:"+this.__move.down+" left:"+this.__move.left+" right:"+this.__move.right);
        //CHECKING VALUES OF THRUST VECTORS (BASED ON KEY INPUTS)
        //console.log("left:"+move.left+" up:"+move.up+" down:"+move.down+" right:"+move.right);
        //console.log("posx:"+this.x+" posy:"+this.y+" velx:"+this._velX+" vely:"+this._velY);
        //console.log("thrustX:"+this._thrustX+" thrustY:"+this._thrustY);
      }
      this.preventTypeaheadFind(e);
      //console.log('keydown event');
    }).bind('keyup', function(e){
      if(e.keyCode===Crafty.keys.RA) move.right=false;
      if(e.keyCode===Crafty.keys.LA) move.left=false;
      if(e.keyCode===Crafty.keys.UA) move.up=false;
      if(e.keyCode===Crafty.keys.DA) move.down=false;
      this.preventTypeaheadFind(e);
      //console.log('keyup event');
    });
    return this;
  }
});
/******END CONTROLS ********/

/********** DEFINE PLAYER SHIP *******/
/**** Ship component
 * This component defines the player ship.  Later it will probably be applied
 * to many ships if we have mutiplayer or go with that type of game mode
 * For now we'll only have a single ship flying around shooting. The ship
 * assumes 2d and physics are also attached
 */
//TODO: we're going to do away with this component. the player ship is merely a ship
//with player controls attached
Crafty.c('PlayerShip', {
  _helmControl: new sw_game.Vector(0,0), //in relation to ship orientation
  _maxYaw: 0,
  _orientation: 0,
  _maxVel: 1,
  _maxAccel: 1,
  _maxThrust: 1,
  _idamper: 1,
  testScreenBorder: function (){
    thisbound={x: this.x, y: this.y, w: this.w, h: this.h};
    gamebound={w: gameWidth, h: gameHeight};
    if(testScreenBorderLeft(thisbound, gamebound)) 
      if(this._vel.x < 0){ this._vel.x = 0; this._accel.x = 0; };
    if(testScreenBorderRight(thisbound, gamebound)) 
      if(this._vel.x > 0){ this._vel.x = 0; this._accel.x = 0; };
    if(testScreenBorderTop(thisbound, gamebound)) 
      if(this._vel.y < 0){ this._vel.y = 0; this._accel.y = 0; };
    if(testScreenBorderBottom(thisbound, gamebound)) 
      if(this._vel.y > 0){this._vel.y = 0; this._accel.y = 0; };
  },
  inertialDampening: function (){ //counter the ships momentum to give a tighter feel to the controls
    if(vel_0 > damp_effect) return -damp_effect;
    if(vel_0 < -damp_effect) return damp_effect;
    return 0;
  },
  PlayerShip: function (){ //the constructor

    this.bind('enterframe', function(){
      //calculate new position based on current pos and velocity
      this.x = this.x+=this._vel.x;
      this.y = this.y+=this._vel.y;
      //this.x=calculateNewPos(this.x, this._velX);
      //this.y=calculateNewPos(this.y, this._velY);
      this._vel.x = calculateNewVel(this._vel.x, this._accel.x, this._maxVel.x);
      this._vel.y = calculateNewVel(this._vel.y, this._accel.y, this._maxVel.y);
      //this._velX = calculateNewVel(this._velX, this._accelX, this._maxVelX);
      //this._velY = calculateNewVel(this._velY, this._accelY, this._maxVelY);
      if(myXOR(this.__move.left, this.__move.right)){
        if(this.__move.left){
          this._accel.x = calculateNewAccel(this._accel.x, -this._maxThrust.x, this._maxAccel.x);
        }
        if(this.__move.right){
          this._accel.x = calculateNewAccel(this._accel.x, this._maxThrust.x, this._maxAccel.x);
        }
      }else{
        this._accel.x=inertialDampening(this._vel.x, this._idamper.x);
        if(this._accel.x==0) this._vel.x=0;
      }
      if(myXOR(this.__move.up, this.__move.down)){
        if(this.__move.up){
          this._accel.y = calculateNewAccel(this._accel.y, -this._thrust.y, this._maxAccel.y);
        }
        if(this.__move.down){
          this._accel.y = calculateNewAccel(this._accel.y, this._thrust.y, this._maxAccel.y);
        }
      }else{
        this._accel.y=inertialDampening(this._vel.y, this._idamper.y);
        if(this._accel.y==0) this._vel.y=0;
      }
      //also test to be sure the player ship doesn't fly out of the screen boundary
      //this.testScreenBorder(this.x, this.y, this.w, this.h);
      this.testScreenBorder();

    });
    return this;
  }
});

/************END PLAYER SHIP DEFINITION***********/

/* Create a 'standard' ship with player controls attached
*/
//function sw_game.createPlayer(){
//sw_game.player.createPlayer = function(){ return 1; };
/*
sw_game.player.createPlayer = function (){
  pl_ship = Crafty.e("2D, DOM, player, controls, PlayerControls, Ship, SWPhysics, animate, collision")
    .attr({
      x: 120, y: 144, z: 1, 
      h: sw_game.ship.SHIPS['standard']['dim_h'],
      w: sw_game.ship.SHIPS['standard']['dim_w']
    })
    .PlayerControls()
    .SWPhysics(sw_game.ship.SHIPS['standard']['mass'])
    .animate('fly_neutral', 0,0,0)
    .animate('fly_neutral_slow', 3,0,3)
    .animate('fly_neutral_fast', 6,0,6)
    .animate('fly_left', 1,0,1)
    .animate('fly_left_slow', 4,0,4)
    .animate('fly_left_fast', 7,0,7)
    .animate('fly_right', 2,0,2)
    .animate('fly_right_slow', 5,0,5)
    .animate('fly_right_fast', 8,0,8)
    .bind('enterframe', function(){
      //check velocity and set the appropriate ship frame accordingly.
      var bank_threshold = this._velX/this._maxVelX;
      var speed_threshold = -this._velY/this._maxVelY;
      //console.log("DEBUG:bank_threshold => "+bank_threshold+" speed_threshold => "+speed_threshold);
      var x_flight=1; var y_flight=0;
      if(Math.abs(bank_threshold) > sw_game.ship.SHIPS['standard']['animation']['bank_threshold2']){
        if(bank_threshold > 0){
          x_flight=2;
        }else{
          x_flight=0;
        }
      }else if(Math.abs(bank_threshold) > sw_game.ship.SHIPS['standard']['animation']['bank_threshold1']){
        x_flight=1;
      }else{
        x_flight=1;
      }
      if(speed_threshold > sw_game.ship.SHIPS['standard']['animation']['thrust_threshold2']){
        y_flight=2;
      }else if(speed_threshold > sw_game.ship.SHIPS['standard']['animation']['thrust_threshold1']){
        y_flight=1;
      }else{
        y_flight=0;
      }
      //console.log("DEBUG: Checking speed => x_vel"+this._velX);
      //check if the desired animation is playing, if no, then stop it
      // and play the correct one
      if(!this.isPlaying(sw_game.ship.PL_SPEED_TO_ANIM_FRAME[x_flight][y_flight], 1)){
        this.stop().animate(sw_game.ship.PL_SPEED_TO_ANIM_FRAME[x_flight][y_flight], 1);
      }
    });
  return pl_ship;
}
*/


sw_game.dependencies.loaded('player');
