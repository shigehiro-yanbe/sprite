var Zako = (function(){
	var Zako = function() {
		this.basex  = randomRange(0,SPRCOORD_WIDTH);
		this.pos    = {x:this.basex, y:-50};
		this.phase  = randomAngle();
		this.shot   = randomRange(0.5*FPS, 1*FPS);
		this.remove = false;
		this.hp     = 10;
	}
	var p = Zako.prototype;

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
		if (this.pos.y >= SPRCOORD_HEIGHT-100) {
			return true;
		}

		// プレイヤー死亡中
		if (IsDead_Player()) {
			return true;
		}

		// 禁止状態じゃない
		return false;
	}

	p.Rect = function() {
		return {left:this.pos.x-8, right:this.pos.x+8, top:this.pos.y-8, bottom:this.pos.y+8};
	}

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

	return Zako;
})();

var EnemyBuffer = (function(){
	var EnemyBuffer = function() {
		this.buffer  = [];
		this.counter = 0;
	}
	var p = EnemyBuffer.prototype;

	p.Update = function(playerpos, enemyshot) {
		// 発生
		if (--this.counter <= 0) {
			this.buffer.push(new Zako());
			this.counter = 1.3*FPS;
		}

		// 生きてるものを更新
		this.buffer.forEach(function(zako,array,index){
			zako.Update(playerpos, enemyshot);
		});
	}

	p.Draw = function() {
		var spr = new Sprite(renderer.image);
		spr.scale = 0.3;
		this.buffer.forEach(function(zako,array,index){
			spr.pos = zako.pos;
			renderer.RegisterSprite(spr);
		}, this);
	}
	
	return EnemyBuffer;
})();
