var Chip = (function(){
	var Chip = function() {
		this.pos   = {x:150, y:200};
		this.size  = 100;
		this.color = [255,255,255];
	}
	var p = Chip.prototype;

	return Chip;
})();

var ExplosionMini = (function(){
	var ExplosionMini = function(pos){
		this.pos    = Object.assign({},pos);
		this.remove = false;
		this.buffer = [];
		this.life   = 0.5*FPS;
	}
	var p = ExplosionMini.prototype;

	p.Update = function() {
		if (--this.life > 0) {
			var chip = new Chip();
			chip.pos.x = this.pos.x + randomRange(-30,+30);
			chip.pos.y = this.pos.y + randomRange(-30,+30);
			chip.size  = 40;
			chip.color = [255,128,0];
			this.buffer.push(chip);
		}

		this.buffer.forEach(function(chip,index,array){
			chip.size -= 8;
		},this);

		this.buffer = this.buffer.filter(function(chip,index,array){
			return chip.size > 0;
		},this);

		if (this.buffer.length <= 0) {
			this.remove = true;
		}
	}

	p.Draw = function() {
		this.buffer.forEach(function(chip,index,array){
			renderer.RegisterChip(chip);
		},this);
	}

	return ExplosionMini;
})();

var ExplosionBuffer = (function(){
	var Explosion = function() {
		this.buffer = [];
	}
	var p = Explosion.prototype;

	p.Update = function() {
		this.buffer = this.buffer.filter(function(e,index,array){
			return !e.remove;
		},this);
		
		this.buffer.forEach(function(e,index,array){
			e.Update();
		},this);
	}

	p.Draw = function() {
		renderer.ResetMatrix();
		this.buffer.forEach(function(e,index,array){
			e.Draw();
		},this);
	}

	p.SetExplosion = function(pos) {
		this.buffer.push(new ExplosionMini(pos));
	}

	return Explosion;
})();
