/* Written by Zachery Chin
 * Last-modified: 19 Apr 2011 12:30:49 AM
 * This file handles misc space objects such as bullets and items
 */

if(typeof(sw_game)==='undefined'){ sw_game = {};};

Crafty.c('bullet', {
  _velX: 0,
  _velY: 0,
  bullet: function(x, y, v_x, v_y){
    this.x=x; this.y=y;
    this._velX=v_x; this._velY=v_y;
    this.bind('enterframe', function(){
      //check if the bullet is off screen, if so delete it.
      if(isOffScreen({x:this.x, y:this.y, w:this.w, h:this.h}, {w:gameWidth, h:gameHeight})){ 
        console.log("BULLET OFF SCREEN!!!"); 
        this.destroy();
        return;
      }
      //update the bullet position
      this.x+=this._velX;
      this.y+=this._velY;
    });
  }
});

sw_game.dependencies.loaded('space_objects');
