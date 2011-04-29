/*   SHIP definitions. 
 *   Last-modified: 29 Apr 2011 11:30:00 AM
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
    'inertial_damper': [0.195, 0.245],
    'mass': 4000,
    'max_speed': 400,
    'max_accel': 50,
    'max_thrust': 80,
    'max_yaw': 8, //in degrees/sec
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
  _idamper: 0,
  SWShip: function (ship_type){ // Constructor
    this._maxYaw = ship_type['max_yaw'];
    this._maxVel = ship_type['max_speed'];
    this._maxAccel = ship_type['max_accel'];
    this._maxThrust = ship_type['max_thrust'];
    this.helmController = function (){
      var heading = this._helmControl.heading();
      if(heading){
      }
  //engage broadside thruster
  //engage main impulse drive
  //engage yaw thrusters
    };
    this.bind('enterframe', function () {
// lets apply a test force to the ship
      if(this.__move.up){
        //this._force.x = 5;
        //this._force.y = 5;
        //console.log('ARE WE GETTING HRE????');
      }
// apply a test rotation to the ship
      if(this.__move.left){
        this._angular_vel = 3;
      }
      if(this.__move.right){
        this._angular_vel = -3;
      }
      //handle the engine output based on input from helm control
    });
    return this;
  }
});

sw_game.dependencies.included("ship");
