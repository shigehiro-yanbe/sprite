var Zako1 = (function(){
	var Zako1 = function() {
		this.basex  = randomRange(0,SPRCOORD_WIDTH);
		this.pos    = {x:this.basex, y:-50};
		this.phase  = randomAngle();
		this.shot   = randomRange(0.5*FPS, 1*FPS);
		this.remove = false; // 削除されたいときにtrueにする
		this.hp     = 10;
	}
	var p = Zako1.prototype;

	// 更新処理
	p.Update = function(playerpos, enemyshot) {
		this.pos.x = this.basex + Math.sin( this.phase ) * 30;
		this.pos.y += 2.2;
		this.phase += Math.PI / (1.5 * FPS);
		if (this.phase >= Math.PI) {
			this.phase -= Math.PI *2;
		}

		// 画面外に出たら死ぬ
		if (this.pos.y >= SPRCOORD_HEIGHT+50) {
			this.remove = true;
			return;
		}
		
		// 弾を撃つ
		if (--this.shot <= 0) {
			// 禁止チェック
			if (!this.checkRestrict(playerpos)) {
				enemyshot.Fire(this.pos, playerpos);
			}
			this.shot = randomRange(0.5*FPS, 2*FPS);
		}
	}

	// 発射禁止状態ならtrueを返す
	p.checkRestrict = function(playerpos) {
		// 登場前は発射しない
		if (this.pos.y < 10) {
			return true;
		}
		
		// 至近距離では発射しない
		var distanceSquare = vecLengthSquare( vecSub(this.pos, playerpos) );
		if (distanceSquare < 100*100) {
			return true;
		}

		// 画面下の方からは発射しない
		if (this.pos.y >= SPRCOORD_HEIGHT-30) {
			return true;
		}

		// 弾丸不許可
		if (!IsEnableBullets()) {
			return true;
		}

		// 禁止状態じゃない
		return false;
	}

	// コリジョン矩形を返す left,right,top,bottom
	p.Rect = function() {
		return {left:this.pos.x-8, right:this.pos.x+8, top:this.pos.y-8, bottom:this.pos.y+8};
	}

	// ダメージを受けたときに呼ばれる
	p.Damage = function() {
		// 登場直後はダメージを入れない
		if (this.pos.y < 50) {
			return;
		}

		// HPが無くなったら死ぬ
		if (--this.hp <= 0) {
			SetExplosion(this.pos);
			this.remove = true;
		}
	}

	return Zako1;
})();

