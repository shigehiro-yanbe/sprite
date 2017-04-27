var Zako = (function(){
	var Zako = function() {
		this.basex = randomRange(0,SPRCOORD_WIDTH);
		this.pos   = {x:this.basex, y:-50};
		this.phase = randomAngle();
		this.shot  = randomRange(0.5*FPS, 1*FPS);
	}
	var p = Zako.prototype;

	p.Update = function(playerpos, enemyshot) {
		this.pos.x = this.basex + Math.sin( this.phase ) * 30;
		this.pos.y += 2.2;
		this.phase += Math.PI / (1.5 * FPS);
		if (this.phase >= Math.PI) {
			this.phase -= Math.PI *2;
		}
		// 弾を撃つ
		if (--this.shot <= 0) {
			var distanceSquare = vecLengthSquare( vecSub(this.pos, playerpos) );
			// 至近距離では発射しない
			if (distanceSquare >= 100*100) {
				enemyshot.Fire(this.pos, playerpos);
			}
			this.shot = randomRange(0.5*FPS, 2*FPS);
		}
	}

	return Zako;
})();

var Enemy = (function(){
	var Enemy = function() {
		this.buffer  = [];
		this.counter = 0;
	}
	var p = Enemy.prototype;

	p.Update = function(playerpos, enemyshot) {
		// 発生
		if (--this.counter <= 0) {
			this.buffer.push(new Zako());
			this.counter = 1.3*FPS;
		}

		// 画面外に出たものを削除
		this.buffer = this.buffer.filter(function(zako,array,index){
			return !(zako.pos.y >= SPRCOORD_HEIGHT+50);
		});

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
	
	return Enemy;
})();
