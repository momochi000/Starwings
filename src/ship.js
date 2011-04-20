/*   SHIP definitions. 
 *   Last-modified: 19 Apr 2011 07:32:34 PM
 *   Here we'll declare stats (attributes) for various ship types that we can
 *   refer to elsewhere, thus keeping things nice and neat.
 *   We should also include the sprite used for this.
 * */
//console.log("DEBUG:SHIP ARE WE GETTING HREE???");
//console.log("DEBUG: SHIP: BEFORE CHECKING FOR THE GAME OBJECT=>"+sw_game);


if(typeof(sw_game) === 'undefined'){var sw_game={}; }
sw_game.ship={};

sw_game.ship.PL_SPEED_TO_ANIM_FRAME = [
  ['fly_left', 'fly_left_slow', 'fly_left_fast'],
  ['fly_neutral', 'fly_neutral_slow', 'fly_neutral_fast'],
  ['fly_right', 'fly_right_slow', 'fly_right_fast']
];

sw_game.ship.SHIPS = {
  'standard': {
    'inertial_damper': [0.195, 0.245],
    'mass': 4000,
    'max_speed': [4,6],
    'max_accel': [1,1],
    'max_thrust': [0.28,0.32],
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
sw_game.ship.inputController = function (inputVector){
  //engage broadside thruster
  //engage main impulse drive
  //engage yaw thrusters
}

// Depends on physics component
Crafty.c('Ship', {
  Ship: function (){
    helmControl: new sw_game.Vector(0,0);
  }
});

sw_game.dependencies.included("ship");
