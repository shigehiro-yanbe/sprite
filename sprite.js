/*
var Sprite = (function(){
	var Sprite = function(image) {
		this.image = image;
		this.pos   = {x:1.5, y:2};
		this.angle = 0;
		this.scale = 1;
	}
	var p = Sprite.prototype;

	return Sprite;
})();
  */

function Sprite(image) {
	return {
		image : image,
		pos   : {x:150, y:200},
		angle : 0,
		scale : 1,
	}
}

