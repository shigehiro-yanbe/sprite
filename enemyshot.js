var EShot = (function(){
	var EShot = function(ownerpos,targetpos) {
		this.pos = Object.assign({},ownerpos);
		var vec = vecSub(targetpos, ownerpos);
		var speed = 4;
		this.vec = vecScale(vec, 1/vecLength(vec) * speed);
	}
	var p = EShot.prototype;

	p.Update = function() {
		this.pos = vecAdd(this.pos, this.vec);
	}

	return EShot;
})();

var EnemyShot = (function(){
	var EnemyShot = function() {
		this.buffer = [];
	}
	var p = EnemyShot.prototype;

	p.Fire = function(ownerpos, targetpos) {
		this.buffer.push(new EShot(ownerpos,targetpos));
	}
	
	p.Update = function() {
		this.buffer.forEach(function(eshot,array,index) {
			eshot.Update();
		});

		var rect = {left:-50, top:-50, right:SPRCOORD_WIDTH+50, bottom:SPRCOORD_HEIGHT+50};
		this.buffer = this.buffer.filter(function(eshot,array,index) {
			return this.checkRect_In(rect, eshot.pos);
		}, this);
	}

	p.Draw = function() {
		var spr = new Sprite(renderer.image);
		spr.scale = 0.05;
		this.buffer.forEach(function(eshot,array,index){
			spr.pos = eshot.pos;
			renderer.RegisterSprite(spr);
		}, this);
	}

	p.checkRect_In = function(rect, pos) {
		// 範囲外じゃなければ範囲内です
		return !((pos.x < rect.left) ||
				 (pos.y < rect.top) ||
				 (pos.x >= rect.right) ||
				 (pos.y >= rect.bottom));
	}

	return EnemyShot;
})();
