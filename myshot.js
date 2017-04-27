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

			// 画面外に出たショットを削除
			if (shot.pos.y < -100) {
				shot.remove = true;
			}
		});

		// ショットキーが押されていれば新しいショットを発射する
		this.newshot(key, playerpos);

	}

	p.newshot = function(key, playerpos) {
		if (!key.Shot()) {
			return;
		}

		var cycle = 0.13 * FPS;
		if (++this.scattercounter >= cycle) {
			this.scattercounter = 0;
		}

		// 新しいショット
		var shot = {
			pos    : Object.assign({}, playerpos),
			vec    : {x:0, y:-1},
			remove : false,
			Rect   : function() { return {left:this.pos.x-5, right:this.pos.x+5, top:this.pos.y-3, bottom:this.pos.y+30} }
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
