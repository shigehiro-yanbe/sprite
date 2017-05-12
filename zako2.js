var Zako2 = (function(){
	var Zako2 = function() {
		this.pos      = { x:randomRange(30,SPRCOORD_WIDTH-30), y:-50 };
		this.remove   = false; // 削除されたいときにtrueにする
		this.hp       = 20;

		this.interval = randomRange(0.5*FPS, 1*FPS);
	}
	var p = Zako2.prototype;

	// 更新処理
	p.Update = function(playerpos, enemyshot) {
		this.pos.y += 2.0;

		// 画面外に出たら死ぬ
		if (this.pos.y >= SPRCOORD_HEIGHT+50) {
			this.remove = true;
			return;
		}

		if (--this.interval <= 0) {
			/*
			if (!this.checkRestrict(playerpos)) {
				this.
			}
			  */
			this.interval = randomRange(0.5*FPS, 2*FPS);
		}
	}

	// コリジョン矩形を返す left,right,top,bottom
	p.Rect = function() {
	}

	// ダメージを受けたときに呼ばれる
	p.Damage = function() {
	}

	return Zako2;
})();
