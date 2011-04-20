if(typeof(sw_game)==='undefined'){ sw_game = {};};

/*TODO: eventually the ship itself will have hardpoints which could accomodate guns.
The hardpoint would automatically acknowledge x and y offset to position the origin of the
projectiles.
 - Shot vector should probably be in polar coordinates*/
Crafty.c('ShipGun', {
  _x_off: 0,
  _y_off: 0,
  _damage: 1,
  _rof: 2,
  _gun_type: 0,
  _gun_level: 0,
//  _shot_vector_x: 0, 
//  _shot_vector_y: -3, 
  fire: function(){
    //create a bullet entity
    newBullet = Crafty.e("bullet, shots, 2D, DOM, collision")
      .animate('fly', 0,0,0)
      .init(this.x, this.y, this._shot_vector_x, this._shot_vector_y);
      //.animate('fly', 1);
   // newBullet.bullet(
    console.log("test fire!!");
  },
  ShipGun: function(speed, x_off, y_off, dmg, rof){
    this._x_off = x_off;
    this._y_off = y_off;
    this._damage = dmg;
    this._rof = rof;
    this._speed = speed;
    this.bind('keydown', function(e){
        console.log("test fire!!");
      if(e.keyCode===Crafty.keys.SP){
        this.fire();
        //fire the gun
      }
    });

    return this;
  }
  
});

sw_game.dependencies.loaded('equipment');
