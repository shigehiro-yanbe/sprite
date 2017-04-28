var MYSHOTCYCLE = 0.13 * FPS;

var MyShot = (function(){
	var MyShot = function(playerpos,scattercounter) {
		this.pos    = Object.assign({}, playerpos);
		this.vec    = {x:0, y:-1};
		this.remove = false;

		var scatter = Math.cos((scattercounter / MYSHOTCYCLE) * Math.PI * 2);
		this.pos.x += scatter * 25;
		this.pos.y -= 15;
		this.vec.x = scatter * 0.14;
		this.vec = vecNormalize(this.vec);
	}
	var p = MyShot.prototype;

	p.Rect = function() {
		return {left:this.pos.x-10, right:this.pos.x+10, top:this.pos.y-3, bottom:this.pos.y+30};
	}

	return MyShot;
})();

var MyShotBuffer = (function(){
	var MyShotBuffer = function(key) {
		this.buffer         = [];
		this.scattercounter = 0;
	}
	var p = MyShotBuffer.prototype;

	p.Update = function(key, playerpos) {
		// 既存のショットを移動させる
		this.buffer.forEach(function(shot,index,array){
			shot.pos = vecAdd(shot.pos, vecScale(shot.vec, 30));

			// 画面外に出たショットを削除
			if (shot.pos.y < -100) {
				shot.remove = true;
			}
		});

		if (IsEnableBullets() && key.Shot()) {
			if (++this.scattercounter >= MYSHOTCYCLE) {
				this.scattercounter = 0;
			}

			this.buffer.push(new MyShot(playerpos, this.scattercounter));
		}
	}

	p.Draw = function() {
		// スプライト表示
		var spr = new Sprite(renderer.image);
		spr.scale = 0.08;
		this.buffer.forEach(function(shot,index,array){
			spr.pos = shot.pos;
			renderer.RegisterSprite(spr);
		}, this);
	}

	return MyShotBuffer;
})();
