var Renderer = (function(){
	var Renderer = function(width, height){
		this.width   = width;
		this.height  = height;
		this.image   = null;
		this.context = null;
		this.buffer  = [];
		this.bgstar  = new BGStar();
	}
	var p = Renderer.prototype;

	p.LoadResource = function(endCallback) {
		this.image = new Image();
		this.image.onload = endCallback;
		this.image.src = "anpanman.png";

		this.context = this.initCanvas(this.width, this.height);
	}

	p.initCanvas = function(width, height) {
		var canvas = document.getElementById('canvas');
		canvas.width  = width;
		canvas.height = height;
		return canvas.getContext("2d");
	}
	
	p.Render = function() {
		this.resetMatrix();
		this.bgstar.Render( this.context );
		this.buffer.forEach(function(value,index,array) {
			this.drawSprite( value );
		}, this);
	}

	p.resetMatrix = function() {
		this.context.setTransform(1,0,0,1,0,0);
	}

	p.drawSprite = function(sprite) {
		this.resetMatrix();
		this.context.translate(sprite.pos.x * SPRPOS_TO_SCREEN, sprite.pos.y * SPRPOS_TO_SCREEN);
		this.context.rotate(sprite.angle);
		this.context.scale(sprite.scale, sprite.scale);
		this.context.translate(sprite.image.width*-0.5, sprite.image.height*-0.5);
		this.context.drawImage(sprite.image,0,0);
	}

	p.RegisterSprite = function(sprite) {
		this.buffer.push( Object.assign({},sprite) );
	}

	p.Clear_SpriteBuffer = function() {
		this.buffer.length = 0;
	}
	
	return Renderer;
})();
