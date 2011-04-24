/* Miscellaneous utility functions and classes for starwings game
 * Last-modified: 23 Apr 2011 12:53:53 PM
 * Written by: zachery chin
 *
 *
 ***********************************************************/
//declareNamespace(sw_game);
if(typeof(sw_game) === 'undefined'){var sw_game = {}; }

//GLOBALS
//var PI = Math.PI;
var PI = 3.141592653589793238462643383;
var TWO_PI = PI*2.0;
var HALF_PI = PI*0.5;
var ONE_AND_HALF_PI = PI*1.5;

//Takes in some angle in degrees and converts to radians
function degreesToRadians(deg){
}

function myXOR(a, b){
  return ( a || b ) && !( a && b );
}

/*Takes in an object and returns the keys.
 * by keys I mean specifically hash keys
 */
function keys(obj){
  for(var key in obj){
    if(obj.hasOwnProperty(key)){ //what does this mean?
      console.log("\nDEBUG:UTIL.js:keys: ==> "+key);
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
  console.log('blah');
}

//END GLOBALS

// ================== Class Vector =============
/* Vector class
 * a container and some utility functions to handle vectors
 */
sw_game.Vector = function (x, y){
  if(typeof(x)===undefined && typeof(y)===undefined){
  }else{
    this.x = x; this.y = y;
  }
  if(typeof(x)===undefined){this.x = x;};
  if(typeof(y)===undefined){this.x = x;};

  this.add = function (other_v){
    this.x+=other_v.x;
    this.y+=other_v.y;
    return this;
  };
  //Add a scalar value to a vector. Alters it's magnitude but the direction of
  //the vector remains unchanged
  this.add_scalar = function (scalar){
    var theta = Math.atan(this.x/this.y);
    var new_vx = scalar * Math.cos(theta);
    var new_vy = scalar * Math.sin(theta);
    var new_v = new Vector(new_vx, new_vy);
    this.add(new_v);
  };
  this.divide = function (other_v) {
    //TODO: implement this
  };
  this.dotProduct = function (other_v) {
    return ((this.x * other_v.x) + (this.y * other_v.y));
  };
  this.getAngleBetween = function (other_v) {
    Math.acos(this.dotProduct(other_v)/Math.abs(this.magnitude, other_v.magnitude));
  };
  this.heading = function (){
    return direction(this.x, this.y);
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
    return new Vector(this.x+other_v.x, this.y+other_v.y)
  }
  this.subtract = function (other_v){
    this.x-=other_v.x;
    this.y-=other_v.y;
    return this;
  };
  this.sub = function () { return subtract(); };//alias for subtract
  this.size = function (){ return magnitude(); };//alias for magnitude
  this.zero = function (){ this.x = 0; this.y = 0; };
  var that=this;
}
//class methods
/* class method to add two vectors.  Returns a vector that is the sum of
 * both without modifying either*/
sw_game.Vector.add = function (v1, v2) {
  return v1.plus(v2);
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
// class constants.  This should probably be at the top
sw_game.Vector.VECTOR_ZERO_THRESHOLD = 0.003;
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
  if(testObj.x+testObj.w < 0 || testObj.y+testObj.h < 0 || x > gameDims.w || y > gameDims.h){
    return false;
  }
  return true;
}


function testScreenBorderLeft(testObj, gameDims){
  if(testObj.x<=0) return true;
  return false;
}
function testScreenBorderRight(testObj, gameDims){
  if(testObj.x+testObj.w >= gameDims.w) return true;
  return false;
}
function testScreenBorderTop(testObj, gameDims){
  if(testObj.y<=0) return true;
  return false;
}
function testScreenBorderBottom(testObj, gameDims){
  if(testObj.y+testObj.h >= gameDims.h) return true;
  return false;
}

sw_game.dependencies.included('util');
