/* 
 * Written by: Zachery Chin
 * Last-modified: 19 Apr 2011 12:56:50 PM
 * This file handles background display and scrolling
 * has facilities for static backgrounds and parallax scroll
 *
 */


if(typeof(sw_game)==='undefined'){sw_game = {};};
sw_game.bg = {};

Crafty.c('StaticBackground', {
});

sw_game.bg.createStaticBackground = function (bgPath, bgWidth, bgHeight){
}
/* Actually I think prallax scroll should be able to handle this case
sw_game.bg.createScrollingBackground = function (bgPath, bgWidth, bgHeight){
}
*/

sw_game.bg.createParallaxBackground = function (layers, bgWidth, bgHeight){
}

sw_game.dependencies.loaded('background');
