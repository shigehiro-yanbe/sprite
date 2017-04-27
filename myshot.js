var MyShot = (function(){
	var MyShot = function(key) {
		this.buffer         = [];
		this.scattercounter = 0;
	}
	var p = MyShot.prototype;

	p.Update = function(key, playerpos) {
		// 既存のショットを移動させる
		this.buffer.forEach(function(shot,index,array){
			shot.pos = vecAdd(shot.pos, vecScale(shot.vec, 30));
		});

		// ショットキーが押されていれば新しいショットを発射する
		this.newshot(key, playerpos);

		// 画面上に出たショットを削除
		this.buffer = this.buffer.filter(function(shot,index,array){
			return !(shot.pos.y < -100); // -100以下を除外
		}, this);
	}

	p.newshot = function(key, playerpos) {
		if (!key.Shot()) {
			return;
		}

		var cycle = 0.13 * FPS;
		if (++this.scattercounter >= cycle) {
			this.scattercounter = 0;
		}

		var shot = {
			pos : Object.assign({}, playerpos),
			vec : {x:0, y:-1},
		}
		var scatter = Math.cos((this.scattercounter / cycle) * Math.PI * 2);
		shot.pos.x += scatter * 25;
		shot.pos.y -= 15;
		shot.vec.x = scatter * 0.14;
		shot.vec = vecNormalize(shot.vec);
		this.buffer.push(shot);
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

	return MyShot;
})();
