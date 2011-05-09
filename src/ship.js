/*   SHIP definitions. 
 *   Last-modified: 08 May 2011 10:59:25 PM
 *   Here we'll declare stats (attributes) for various ship types that we can
 *   refer to elsewhere, thus keeping things nice and neat.
 *   We should also include the sprite used for this.
 * */


if(typeof(sw_game) === 'undefined'){var sw_game={}; }
sw_game.Ship={};

sw_game.Ship.PL_SPEED_TO_ANIM_FRAME = [
  ['fly_left', 'fly_left_slow', 'fly_left_fast'],
  ['fly_neutral', 'fly_neutral_slow', 'fly_neutral_fast'],
  ['fly_right', 'fly_right_slow', 'fly_right_fast']
];

sw_game.Ship.SHIPS = {
  'standard': {
    'inertial_damper': 80.0,
    'mass': 4000,
    'max_speed': 400,
    'max_accel': 50,
    //'max_thrust': 80000,
    'max_thrust': 600000,
    'max_yaw': 3, //in degrees/sec
    'dim_h': 32, //in pixels
    'dim_w': 32, //in pixels
    'animation': {
      'bank_threshold1': 0.1,
      'bank_threshold2': 0.45,
      'thrust_threshold1': 0.01,
      'thrust_threshold2': 0.90
    }
  }
};


/* This function handles helm control given to a ship. It works along with
 * the ships engines to determine, based on the given input vector, how much
 * thrust to apply in each direction in order to move the ship in the
 * direction of the input. It is meant to be attached to the ship controls
 * This belongs in the ship itself i believe..
 */

//determines when to apply thrust.  Let's make this in radians
var THRUST_DIR_THRESHOLD = 10; 

sw_game.Ship.inputController = function (inputVector){
  var heading = inputVector.heading();
  //engage broadside thruster
  //engage main impulse drive
  //engage yaw thrusters
}

// Depends on physics component
Crafty.c('SWShip', {
  _helmControl: new sw_game.Vector(0,0),
  _maxYaw: 0,
  _maxVel: 0,
  _maxAccel: 0,
  _maxThrust: 0,
  _iDamper: 0,
  _iDamperActive: false,
  //fires the side thrusters of the ship.  direction is a boolean 
  //dictating whether to burn port or starboard
  _broadSideThruster: function (power, direction) {
    if(direction){
      //apply force at 90degree angle from ships heading
    }else{
      //apply force at 90degree angle from ships heading
    }
  },
  //generates an acceleration then affects the velocity with that accel
  _iDamperEffect: function () { 
    var new_accel = new sw_game.Vector();
    var damp_power = 0;
    var theta = this._force.getAngleBetween(this._vel);
    if(this._force.isZero()){
      damp_power = 1;
    }else if(theta >= 2*Math.PI){
      damp_power = 1;
    }else if(theta == 0){
      damp_power = 0;
    }else if(theta == NaN){
      damp_power = 0;
    }else{
      damp_power = Math.PI/2 * (theta);//calculate the appropriate amount of inertial dampening
    }
    new_accel.setWithAngleAndDistance(sw_game.Vector.addAngles(
      Math.PI, this._vel.heading()), 
      damp_power*this._iDamper);

    if(!new_accel.isZero()){
      this.updateVelWithAccel(new_accel);
    }
    new_accel = null;
  },
  //Engages the main impulse engine for the ship.  Applies a thrust
  //Directly behind the ship (based on it's orientation)
  //Amount of thrust applied is proportional to it's total power *
  //the input power which is a float between 0 and 1
  _impulseDrive: function (power) {
    if(typeof(power) === 'undefined'){ power = 1; }
    var newForce = new sw_game.Vector();
    var force_mag = power * this._maxThrust;
    var theta = degreesToRadians(this._orientation); //subtract 90 to rotate to ship nose
    newForce.x = force_mag*Math.cos(theta);
    newForce.y = force_mag*Math.sin(theta);
    this._force.add(newForce);
    newForce = null; force_mag = null; theta = null;//clear local vars
  },
  //Fires the thrusters to turn the ship.  Direction is a boolean 
  //dictating whether to turn port or starboard
  _yawThruster: function (power, direction) {
    if(direction){
      this._angular_vel = this._maxYaw*power;
    }else{
      this._angular_vel = this._maxYaw*power*-1;
    }
  },
  SWShip: function (ship_type){ // Constructor
    this._maxYaw = ship_type['max_yaw'];
    this._maxVel = ship_type['max_speed'];
    this._maxAccel = ship_type['max_accel'];
    this._maxThrust = ship_type['max_thrust'];
    this._iDamper = ship_type['inertial_damper'];
    this.helmController = function (){ // TODO: IN PROGRESS
      var heading = this._helmControl.heading();
      if(heading && heading != NaN){
        //compare current direction with desired heading

        //engage broadside thruster
        //engage main impulse drive
        //engage yaw thrusters
      }
    };
    this.bind('enterframe', function () {
      // lets apply a test force to the ship
      if(this.__move.up){
        this._impulseDrive(0.8);
      }
      // apply a test rotation to the ship
      if(this.__move.left){
        //this._angular_vel = -3;
        this._yawThruster(1, false);
      }
      if(this.__move.right){
        //this._angular_vel = 3;
        this._yawThruster(1, true);
      }
      // if no input, then disable all engines
      if(!this.__move.left && !this.__move.right){
        this._angular_vel = 0;
      }
      //handle the engine output based on input from helm control
      //inertial damper affects velocity
    });
    this.bind('enterframe', function() {
      this._iDamperEffect();
    });
    return this;
  }
});

// Class methods =================================================
/*
  takes in the player ship and the data of how to attach the anims
  I predefine how animations are handled. In the case of this game,
  they're dependent on physical states of the target object.  Meaning, engine
  burn length dependent on how much thrust being applied. Bank animation
  depending on angular velocity. 
  anim_def must align with the sprite that is chosen for this entity.
  there must also be a physics component attached to this entity.
*/
sw_game.Ship.attachAnimationsToShip = function (ship, anim_def){
};

sw_game.dependencies.included("ship");
