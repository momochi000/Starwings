/*
 * Crafty physics component for use in 2d spaceflight
 *
 *  This file depends on sw_game.Vectors from util.js
 */
//IN PROGRESS: building the applyforce function and related.  Need to do 
//the same with angular velocity

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
  _mass: 1, // kg
  _orientation: 0, //in degrees 0-355
  _vel: 0, // m/s
  applyForce: function(force){ // applies the given force (in newtons) vector to self.
    var result_accel = new Vector(force.x/this.mass, force.y/this.mass); //calculate new acceleration
    this.accel = this.accel.add(result_accel); //add new accel to current accel
  },
  calculateNewPos: function (oldp, vel){ //update the entity position
    this.x += vel.x;
    this.y += vel.y;
  },
  calculateNewVel: function (oldv, accel, maxvel){ //update the velocity
    var newXVel = oldv.x += accel.x;
    var newYVel = oldv.y += accel.y;
    if(Math.abs(newXVel) > maxvel.x){
      if(newXVel > 0) this._vel.x = maxvel.x;
      if(newXVel < 0) this._vel.x = -maxvel.x;
    }else{
      this._vel.x = newXVel;
    }
    if(Math.abs(newYVel) > maxvel.y){
      if(newYVel > 0) this._vel.y = maxvel.y;
      if(newYVel < 0) this._vel.y = -maxvel.y;
    }else{
      this._vel.y = newYVel;
    }
  },
  calculateNewAccel: function (olda, incr, maxaccel){ //update the accel
    var newXAccel = olda.x += incr.x;
    var newYAccel = olda.y += incr.y;
    if(Math.abs(newXAccel) > maxaccel.x){
      if(newAccel.x > 0) this._vel.x = maxaccel.x;
      if(newAccel.x < 0) this._vel.x = -maxaccel.x;
    }else{
      this._vel.x = newAccel.x;
    }
    if(Math.abs(newYAccel) > maxaccel.y){
      if(newAccel.y > 0) this._vel.y = maxaccel.y;
      if(newAccel.y < 0) this._vel.y = -maxaccel.y;
    }else{
      this._vel.y = newYVel;
    }
  },
  rotate: function (deg){
    this._orientation = (this._orientation + deg) % 360;
  },
  SWPhysics: function (mass){ //constructor
    this._vel = new sw_game.Vector(0,0);
    this._accel = new sw_game.Vector(0,0);
    this._mass = mass;
    this.bind('enterframe', function () {
      //calculate new velocity based on accel
    });
    return this;
  }
});

//Note these functions only work on a single axis. calculating for x, y will require 2 calls

sw_game.dependencies.included('physics');
