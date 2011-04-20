/* Starwings app
 * 
 * by: Zachery Chin
 * Last-modified: 19 Apr 2011 06:55:37 PM
 *
 * This file defines the entry-point to the game.  Initiializes the 
 * namespace and lists out dependencies
 */


if(typeof(sw_game) === 'undefined'){var sw_game = {}; };

//at the moment this doesn't do anything but it may prove useful in the future
//lets say these (keys) also refer to a namcespace which the file may use
//PROBLEM: problem i'm having here is I don't know what to do if a dependency
//isn't loaded.  I guess i could add the script to the header? I want to try that
//out later.
sw_game.dependencies = {
  'util': {
    src: 'src/util.js',
    loaded: false
  },
  'ship': {
    src: 'src/ship.js',
    loaded: false
  },
  'sw_game': {
    src: 'src/sw_game.js',
    loaded: false
  },
  'player': {
    src: 'src/player.js',
    loaded: false
  },
  'space_objects': {
    src: 'src/space_objects.js',
    loaded: false
  },
  'physics': {
    src: 'src/physics.js',
    loaded: false
  },
  'background': {
    src: 'src/background.js',
    loaded: false
  },
  loadDependency: function (name){
    //TODO: add the script header to the document head
    return null;
  },
  included: function (name){ this.loaded(name); }, //alias for loadDependency
  loaded: function (name){ 
    //check if the dependency exists
    if((this[name])===undefined) return false;
    this[name].loaded=true;
  }
};

//check that all the dependencies are loaded if not then fail with error
// message

//var deps = keys(sw_game.dependencies);
//for(var dep_itor in deps){
//}
//console.log("DID WE GET HRE???");
