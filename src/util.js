/* Miscellaneous utility functions and classes for starwings game
 * Last-modified: 05 May 2011 01:00:07 PM
 * Written by: zachery chin
 *
 * This file contains some utility functions and classes used by the game
 * which don't seem to fit anywhere else.
 * as of now: 
 * Vector: representing a 2d line segment
 *
 ***********************************************************/
//declareNamespace(sw_game);
if(typeof(sw_game) === 'undefined'){var sw_game = {}; }

//GLOBALS
var DEFAULT_COMPARATOR_DELTA = 0.00001;
var PI = 3.141592653589793238462643383;
var TWO_PI = PI*2.0;
var HALF_PI = PI*0.5;
var ONE_AND_HALF_PI = PI*1.5;
var ROUND_TO_ZERO = 1.0e-5; //anything less than this should be considered zero
//Takes in some angle in degrees and converts to radians
//Might be good to add this to the Math namespace

// Filter which applies to all the comparator functions, setting the default delta 
// if it isn't defined, merely a DRYing technique.  Perhaps there's a better way...
// something I'd do in a functional lang maybe
//function setDefaultDelta(delta){return DEFAULT_COMPARATOR_DELTA;}
function setDefaultDelta(delta){
  if(typeof(delta) === 'undefined'){
    return DEFAULT_COMPARATOR_DELTA;
  }
  return delta;
}
function compareFloatsWithDelta(f1, f2, delta){
  delta = setDefaultDelta(delta);
  //if(typeof(delta) === 'undefined'){ var delta = DEFAULT_COMPARATOR_DELTA; }
  var comp = f1-f2;
  if(Math.abs(comp) < delta){
    return 0;
  }else if(f1 < f2){
    return -1;
  }else if(f1 > f2){
    return 1;
  }
  return null;
}
function isFloatLT(f1, f2, delta){
  delta = setDefaultDelta(delta);
  var ans = compareFloatsWithDelta(f1, f2, delta);
  if(ans == null){
    return false;
  }else if(ans<0){
    return true;
  }else{
    return false;
  }
  //if( compareFloatsWithDelta(f1, f2, delta) < 0 ){return true;}else{ return false;}
}
function isFloatGT(f1, f2, delta){
  delta = setDefaultDelta(delta);
  var ans = compareFloatsWithDelta(f1, f2, delta);
  if(ans==null){
    return false;
  }else if(ans>0){
    return true;
  }else{
    return false;
  }
  //if( compareFloatsWithDelta(f1, f2, delta) > 0 ){return true;}else{ return false;}
}
function isFloatGTE(f1, f2, delta){
  delta = setDefaultDelta(delta);
  var ans = compareFloatsWithDelta(f1, f2, delta);
  if(ans==null){
    return false;
  }else if(ans==0){
    return true;
  }else if(ans>0){
    return true;
  }else{
    return false;
  }
  //if( compareFloatsWithDelta(f1, f2, delta) == 0 ){return true;}
  //if( compareFloatsWithDelta(f1, f2, delta) > 0 ){return true;}else{ return false;}
}
function isFloatLTE(f1, f2, delta){
  delta = setDefaultDelta(delta);
  var ans = compareFloatsWithDelta(f1, f2, delta);
  if(ans==null){
    return false;
  }else if(ans == 0){
    return true;
  }else if(ans<0){
    return true;
  }else{
    return false;
  }
  //if( compareFloatsWithDelta(f1, f2, delta) == 0 ){return true;}
  //if( compareFloatsWithDelta(f1, f2, delta) < 0 ){return true;}else{ return false;}
}
function isFloatEQ(f1, f2, delta){
  delta = setDefaultDelta(delta);
  if( compareFloatsWithDelta(f1, f2, delta) == 0 ){return true;}
  return false;
}
function degreesToRadians(deg){
  return (deg*(Math.PI/180));
}
function radiansToDegrees(rads){
  return (rads*(180/Math.PI));
}
function myXOR(a, b){
  return ( a || b ) && !( a && b );
}
function roundToZero(val){
  if(val < ROUND_TO_ZERO && val > -ROUND_TO_ZERO){
    return 0;
  }
  return val;
}
//Function that reports whether a given value is negative, positive, or zero
//Returns -1 if the value is < 0, returns 1 if greater than 0 and 0 if == 0
function sign(val){
  if(isFloatLT(val,0, .01)){
    return -1;
  }else if(isFloatGT(val,0, .01)){
    return 1;
  }else if(isFloatEQ(val,0, .01)){
    return 0;
  }
  console.log("DEBUG:UTIL:SIGN() ==> Are we getting here? never should");
  return val;
}

/*Takes in an object and returns the keys.
 * by keys I mean specifically hash keys
 */
function keys(obj){
  for(var key in obj){
    if(obj.hasOwnProperty(key)){ //what does this mean?
    }
    var keys=[];
    keys.push(key);
  }
  return keys;
}
function zDebug(msg){
  var thisfile = document.location.pathname;
  console.log("debugging the debug function, what file does it return? ==>" + thisfile);
  var newmsg = "DEBUG:"+thisfile;
}

//END GLOBALS

// ================== Class Vector =============
/* Vector class
 * a container and some utility functions to handle vectors
 */
sw_game.Vector = function (x, y){
  if(typeof(x)==='undefined' && typeof(y)==='undefined'){
    this.x=0; this.y=0;
  }else{
    this.x = x; this.y = y;
  }

  this.add = function (other_v){
    new_v = sw_game.Vector.addVectors(this, other_v);
    this.x = new_v.x;
    this.y = new_v.y;
    new_v = null;
    return this;
  };
  //Add a scalar value to a vector. Alters it's magnitude but the direction of
  //the vector remains unchanged. does not change the value of self..
  // Note to self: i seem to fall on ruby habits for naming conventions, i 
  // looked at my own code and was surprised to see add_scalar
  this.addScalar = function (scalar){ 
    var new_vec = sw_game.Vector.addScalarToVector(this, scalar);
    this.x = new_vec.x; this.y = new_vec.y;
    new_vec = null;
    return this;
  };
  this.divide = function (other_v) {
    //TODO: implement this
  };
  this.dotProduct = function (other_v) {
    return ((this.x * other_v.x) + (this.y * other_v.y));
  };
  //returns the angle between two vectors
  this.getAngleBetween = function (other_v) {
    return Math.acos(this.dotProduct(other_v)/(this.magnitude() * other_v.magnitude()));
  };
  this.heading = function (){
    //return direction(this.x, this.y);
    //return this.direction(this.x, this.y);
    return sw_game.Vector.direction(this.x, this.y);
  };
  this.isZero = function(){ //return true if the vector is 0,0 or close enough to it
    if(this.x == 0 && this.y == 0) return true;
    return false;
  };
  this.magnitude = function (){
    return Math.sqrt(this.x*this.x + this.y*this.y);
  };
  this.mag = function (){ return this.magnitude(); }//alias for magnitude
  this.multiply = function (other_v){
  };
  this.plus = function (other_v){ //like add but doesn't change value
    return sw_game.Vector.addVectors(this, other_v);
  }
  this.subtract = function (other_v){
    this.x-=other_v.x;
    this.y-=other_v.y;
    return this;
  };
  this.sub = function () { return subtract(); };//alias for subtract
  this.size = function (){ return magnitude(); };//alias for magnitude
  //a string representation of the vector (for debug)
  this.to_s = function () { return( "x: "+this.x+", y: "+this.y); 
  } 
  this.to_string = function () { return this.to_s; } //alias for to_s
  this.zero = function (){ this.x = 0; this.y = 0; };
  var that=this;
}
//class methods
/* class method to add two vectors.  Returns a vector that is the sum of
 * both without modifying either*/
sw_game.Vector.addVectors = function (v1, v2) {
  return new sw_game.Vector(v1.x+v2.x, v1.y+v2.y)
}
sw_game.Vector.degreesToRadians = function (degs){
  return (degs*(Math.PI/180));
}
sw_game.Vector.radiansToDegrees = function (rads){
  return (rads*(180/Math.PI));
}
sw_game.Vector.addScalarToVector = function (vec, scalar){
    var theta = Math.atan(vec.y/vec.x);
    var new_vx = scalar * roundToZero(Math.cos(theta));
    var new_vy = scalar * roundToZero(Math.sin(theta));
    var new_v = new sw_game.Vector(new_vx, new_vy);
    //new_vx = null; new_vy=null;theta=null; //Deallocate variables.  Does this matter??
    return vec.add(new_v);
}
/* class method to calculate the direction of a vector based on cartesian 
 * coordinates x and y*/
sw_game.Vector.direction = function (x, y) {
  if(x>0){
    if(y>=0){
      return Math.atan(y/x);
    }else{
      return Math.atan(y/x);+TWO_PI;
    }
  }else if(x==0){
    if(y>0){
      return HALF_PI;
    }else if(y==0){
      return 0;
    }else{
      return ONE_AND_HALF_PI;
    }
  }else{
    return Math.atan(y/x)+PI;
  }
}
// END VECTOR CLASS ============================


/* UTILITY Funcs
Returns true if the given object (position and bound) is at or outside of the
screen
*/
sw_game.isOffScreen = function (testObj, gameDims){  //utility function
  return !isOnScreen(testObj, gameDims);
}
//TODO: need to adjust the screen to include any shifts from the viewport moving
//returns true if the given object or pixel is on screen
sw_game.isOnScreen = function (testObj, gameDims){
  if(typeof(testObj.w)===undefined) testObj.w=0;
  if(typeof(testObj.h)===undefined) testObj.h=0;
  if(testObj.x+testObj.w < 0 || 
      testObj.y+testObj.h < 0 || 
      x > gameDims.w || 
      y > gameDims.h){
    return false;
  }
  return true;
}


sw_game.dependencies.included('util');
