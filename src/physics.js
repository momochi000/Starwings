/*
 * Crafty physics component for use in 2d spaceflight
 *
 *  This file depends on sw_game.Vectors from util.js
 */
//IN PROGRESS: building the applyforce function and related.  Need to do 
//the same with angular velocity
//ALSO, in the game logic, ensure that the object does not surpass
//it's maximum velocity or acceleration.  This does not relate to 
//physics as explosions or other effects may push a ship beyond
//max accel. Max accel merely relates to engine performance

if(typeof(sw_game) === 'undefined'){var sw_game={}; }

/* PHYSICS component
 * Add this to any entity which has a mass and who's motion is
 * to be tracked.  Declare the mass in the constructor.  This is
 * meant to be attached along with 2D>  _vel and _accel are 
 * vectors
 */
Crafty.c('SWPhysics', {
  _accel: 0, // m/s^2
  _angular_vel: 0, // degrees per second: dps
  _angular_accel: 0, // dps*s
  _force: 0, // N
  _mass: 1, // kg
  _orientation: 0, //in degrees 0-355
  _vel: 0, // m/s
  _world_posX: 0, //in what, kilometers? meters?
  _world_posY: 0,
  addForce: function(force){ //add a force to this object
    this._force.add(force);
  },
  // This applies the force vector to self.
  applyForce: function(){
    this._accel.x = this._force.x/this._mass;
    this._accel.y = this._force.y/this._mass;
  },
  rotate: function (deg){
    this._orientation = (this._orientation + deg) % 360;
    console.log("Rotating this object, new orientation => "+ this._orientation);
    this.rotation = this._orientation;
    console.log("Checking status of the (2d)rotation => "+ this.rotation);
  },
  //TODO: BIG DISTINCTION: this.x is referring to the 2D component
  //(the double edged sword that is multiple inheritence). We want to keep
  //the x and y coords (representing position on screen separate from the
  //physical (game) coordinates which should be stored here, then have a 
  //function which translates between them
  updatePos: function (){ //update the entity position
    this.x += this._vel.x;
    this.y += this._vel.y;
  },
  updateVel: function (){ //update the velocity given accel
    this._vel.add(this._accel);
  },
  //update the accel based on the input force.  Accel in m/s^2
  //force in N.  I think this will be handled by apply force instead
  updateAccel: function (force){
    //this.accel.add(incr);
    this.accel.x = force.x / this._mass;
    this.accel.y = force.y / this._mass;
  },
  updateOrientation: function(){ //rotate the entity
    this.rotate(this._angular_vel);
  },
  SWPhysics: function (mass){  //constructor
    this._accel = new sw_game.Vector(0,0);
    this._force = new sw_game.Vector(0,0);
    this._mass = mass;
    this._vel = new sw_game.Vector(0,0);
    this.bind('enterframe', function () {
      this.applyForce(); // update the accel based on forces acting on self
      this.updateVel(); //calculate new velocity based on accel
      this.updatePos(); //calculate new position based on velocity
      //update the orientation of self based on any angular momentum
      this.updateOrientation();

      this._force.zero();//reset the force to zero.
    });
    return this;
  }
});

sw_game.dependencies.included('physics');
