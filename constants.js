var SCREEN_WIDTH     = 3;
var SCREEN_HEIGHT    = 4;

var SCREEN_PIXEL_MAG = 200;
var CANVAS_WIDTH     = SCREEN_WIDTH  * SCREEN_PIXEL_MAG;
var CANVAS_HEIGHT    = SCREEN_HEIGHT * SCREEN_PIXEL_MAG;

var SPRITE_POS_MAG   = 100;
var SPRCOORD_WIDTH   = SCREEN_WIDTH  * SPRITE_POS_MAG;
var SPRCOORD_HEIGHT  = SCREEN_HEIGHT * SPRITE_POS_MAG;
var SPRPOS_TO_SCREEN = (1/SPRITE_POS_MAG)*SCREEN_PIXEL_MAG;

var FPS = 60;

var KEY = {
	SPACE : 32,
	LEFT  : 37,
	UP    : 38,
	RIGHT : 39,
	DOWN  : 40,
};

var DIR = {
	NONE      : 0,
	UP        : 1,
	UPRIGHT   : 2,
	RIGHT     : 3,
	DOWNRIGHT : 4,
	DOWN      : 5,
	DOWNLEFT  : 6,
	LEFT      : 7,
	UPLEFT    : 8,
};

function angvec(ang) {
	return {
		x: Math.cos(ang),
		y: Math.sin(ang),
	}
}

var DIRTABLE = [
	{x:0, y:0},
	angvec( Math.PI*-0.5 ),
	angvec( Math.PI*-0.25 ),
	angvec( 0 ),
	angvec( Math.PI*0.25 ),
	angvec( Math.PI*0.5 ),
	angvec( Math.PI*0.75 ),
	angvec( Math.PI ),
	angvec( Math.PI*-0.75 ),
	];