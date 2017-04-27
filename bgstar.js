var Star = (function(){
	var Star = function() {
		this.x     = this.randX();
		this.y     = this.randY();
		this.speed = this.randSpeed();
		this.color = this.randColor();
	}
	var p = Star.prototype;

	p.randX     = function() { return randomRange(0, CANVAS_WIDTH); }
	p.randY     = function() { return randomRange(0, CANVAS_HEIGHT); }
	p.randSpeed = function() { return CANVAS_HEIGHT / (randomRange(0.5, 3.5) * FPS) ; }
	p.randColor = function() { return randomAngle(); }

	p.Update = function() {
		this.y += this.speed;
		if (this.y >= CANVAS_HEIGHT) {
			this.x     = this.randX();
			this.y     = 0;
			this.speed = this.randSpeed();
			this.color = this.randColor();
		}
	}

	return Star;
})();

var BGStar = (function(){
	var BGStar = function() {
		this.stars = [];
		for (var i = 0; i < 100; ++i) {
			this.stars.push( new Star() );
		}
	}
	var p = BGStar.prototype;

	p.Update = function() {
		this.stars.forEach(function(star,index,array){
			star.Update();
		});
	}

	p.Render = function(context) {
		context.fillStyle = "#000000";
		context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		context.fillStyle = "#ffffff";
		this.stars.forEach(function(star,index,array){
			context.fillRect(star.x, star.y, 2, 2);
		});
	}
	
	return BGStar;
})();

