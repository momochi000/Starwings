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
    //console.log("Calling apply force => ", this._force.to_s());
    this._accel.x = this._force.x/this._mass;
    this._accel.y = this._force.y/this._mass;
    //console.log("Calling apply force => Resultant accel: ", this._accel.to_s());
  },
  rotate: function (deg){
    this._orientation = (this._orientation + deg) % 360;
    //console.log("Rotating this object, new orientation => "+ this._orientation);
    this.rotation = this._orientation+90; //rotation is a feature of the 2D component
    //console.log("Checking status of the (2d)rotation => "+ this.rotation);
  },
  //TODO: Rather than simply multiply by timestep, we need to check against
  //the previous frame to see if we've skipped or lost any frames.
  updatePos: function (){ //update the entity position
    //this.x += this._vel.x;
    this._world_posX += (this._vel.x * sw_game.TIMESTEP)
    this.x += (this._vel.x * sw_game.TIMESTEP) // for now also mirror the 2d obj coord
    //this.y += this._vel.y;
    this._world_posY += (this._vel.y * sw_game.TIMESTEP)
    this.y += (this._vel.y * sw_game.TIMESTEP)
  },
  updateVel: function (){ //update the velocity given accel
    this.updateVelWithAccel(this._accel);
  },
  updateVelWithAccel: function (acceleration_vector) {
    if(acceleration_vector.isZero()) return false; // do nothing
    //console.log("===");
    //console.log("DEBUG:PHYSICS:UPDATEVEL: Frame number: => "+Crafty.frame());
    //console.log("DEBUG:PHYSICS:UPDATEVEL:Input accel => "+acceleration_vector.to_s());
    //console.log("DEBUG:PHYSICS:UPDATEVEL:pre velocity => "+this._vel.to_s());
    this._vel.x += (acceleration_vector.x * sw_game.TIMESTEP)
    this._vel.y += (acceleration_vector.y * sw_game.TIMESTEP)
    //console.log("DEBUG:PHYSICS:UPDATEVEL:post velocity => "+this._vel.to_s());
    //console.log("===================");
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
  zeroVel: function (){
    this._vel.zero;
  },
  SWPhysics: function (mass){  //constructor
    this._accel = new sw_game.Vector(0,0);
    this._force = new sw_game.Vector(0,0);
    this._mass = mass;
    this._vel = new sw_game.Vector(0,0);
    this.bind('enterframe', function () {
      this.applyForce(); // update the accel based on forces acting on self
      this._force.zero(); //after thrust is applied, it should be zeroed?
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
