var EShot = (function(){
	var EShot = function(ownerpos,targetpos) {
		this.pos = Object.assign({},ownerpos);
		var vec = vecSub(targetpos, ownerpos);
		var speed = 2.5;
		this.vec = vecScale(vec, 1/vecLength(vec) * speed);
		this.remove = false;
	}
	var p = EShot.prototype;

	p.framerect = {left:-50, top:-50, right:SPRCOORD_WIDTH+50, bottom:SPRCOORD_HEIGHT+50};

	p.Update = function() {
		this.pos = vecAdd(this.pos, this.vec);

		// 画面外に出たら消える
		if (!this.checkRect_In(this.framerect, this.pos)) {
			this.remove = true;
		}
	}

	p.checkRect_In = function(rect, pos) {
		// 範囲外じゃなければ範囲内です
		return !((pos.x < rect.left) ||
				 (pos.y < rect.top) ||
				 (pos.x >= rect.right) ||
				 (pos.y >= rect.bottom));
	}

	p.Rect = function() {
		return {left:this.pos.x-1, right:this.pos.x+1, top:this.pos.y-1, bottom:this.pos.y+1};
	}

	return EShot;
})();

var EnemyShotBuffer = (function(){
	var EnemyShotBuffer = function() {
		this.buffer = [];
	}
	var p = EnemyShotBuffer.prototype;

	p.Fire = function(ownerpos, targetpos) {
		this.buffer.push(new EShot(ownerpos,targetpos));
	}
	
	p.Update = function() {
		this.buffer.forEach(function(eshot,array,index) {
			eshot.Update();
		});
	}

	p.Draw = function() {
		var spr = new Sprite(renderer.image);
		spr.scale = 0.05;
		this.buffer.forEach(function(eshot,array,index){
			spr.pos = eshot.pos;
			renderer.RegisterSprite(spr);
		}, this);
	}

	return EnemyShotBuffer;
})();
