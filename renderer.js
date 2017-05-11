var Renderer = (function(){
	var img_list = {
		apm: "anpanman.png",
		psk: "pushspacekey.png",
		gameover: "gameover.png",
		complete: "complete.png",
	};
	
	var Renderer = function(width, height){
		this.width   = width;
		this.height  = height;
		this.images  = {};
		this.endCallback = null;
		
		this.context = null;
		this.buffer  = [];
		this.bgstar  = new BGStar();
	}
	var p = Renderer.prototype;

	p.LoadResource = function(endCallback) {
		this.endCallback = endCallback;
		this.context = this.initCanvas(this.width, this.height);

		var self = this;
		for (var name in img_list) {
			var image = new Image();
			this.images[name] = image;
			image.onload = function() { self.onLoad(); };
		}
		for (var name in img_list) {
			this.images[name].src = img_list[name];
		}
	}

	p.onLoad = function() {
		for (var name in img_list) {
			if (!this.images[name].complete) {
				return;
			}
		}
		this.endCallback();
	}

	p.initCanvas = function(width, height) {
		var canvas = document.getElementById('canvas');
		canvas.width  = width;
		canvas.height = height;
		return canvas.getContext("2d");
	}
	
	p.Render = function() {
		this.ResetMatrix();
		this.bgstar.Render( this.context );

		var prev_chip = false;
		this.buffer.forEach(function(value,index,array) {
			if ("sprite" in value) { 
				this.drawSprite( value );
				prev_chip = false;
			}
			else if ("chip" in value) {
				if (!prev_chip) {
					this.ResetMatrix();
					prev_chip = true;
				}
				this.drawChip( value );
			}
		}, this);
	}

	p.ResetMatrix = function() {
		this.context.setTransform(1,0,0,1,0,0);
	}

	p.drawSprite = function(sprite) {
		this.ResetMatrix();
		this.context.translate(sprite.pos.x * SPRPOS_TO_SCREEN, sprite.pos.y * SPRPOS_TO_SCREEN);
		this.context.rotate(sprite.angle);
		var scale = TEXTURE_MAG * sprite.scale;
		this.context.scale(scale, scale);
		this.context.translate(sprite.image.width*-0.5, sprite.image.height*-0.5);
		this.context.drawImage(sprite.image,0,0);
	}

	p.RegisterSprite = function(sprite) {
		var s = Object.assign({}, sprite);
		s.sprite = undefined;
		this.buffer.push( s );
	}

	p.RegisterChip = function(chip) {
		var c = Object.assign({}, chip);
		c.chip = undefined;
		this.buffer.push(c);
	}

	p.Clear_SpriteBuffer = function() {
		this.buffer.length = 0;
	}

	p.drawChip = function(chip) {
		this.context.fillStyle = "rgb(" + chip.color + ")";
		var halfsize = chip.size * 0.5;
		var size     = chip.size * SPRPOS_TO_SCREEN;
		this.context.fillRect(
			(chip.pos.x-halfsize)*SPRPOS_TO_SCREEN,
			(chip.pos.y-halfsize)*SPRPOS_TO_SCREEN,
			size,
			size);
	}
	
	return Renderer;
})();
