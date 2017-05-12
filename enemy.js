var EnemyBuffer = (function(){
	var EnemyBuffer = function() {
		this.buffer  = [];
		this.counter = 0;
	}
	var p = EnemyBuffer.prototype;

	p.Update = function(playerpos, enemyshot) {
		/*
		// 発生
		if (--this.counter <= 0) {
			this.buffer.push(new Zako());
			this.counter = 0.5*FPS;
		}
		  */

		// 生きてるものを更新
		this.buffer.forEach(function(zako,array,index){
			zako.Update(playerpos, enemyshot);
		});
	}

	p.Draw = function() {
		var spr = new Sprite(renderer.images["apm"]);
		spr.scale = 0.17;
		this.buffer.forEach(function(zako,array,index){
			spr.pos = zako.pos;
			renderer.RegisterSprite(spr);
		}, this);
	}

	p.Generate = function(type) {
		this.buffer.push( this.generateCore(type) );
	}

	p.generateCore = function(type) {
		switch(type) {
		case EnemyType.Zako1: return new Zako1();
		case EnemyType.Zako2: return new Zako2();
		case EnemyType.Boss1: return new Zako1();
		default:
			throw new Error("unknown enemy type:"+type);
		}
	}

	p.IsEmpty = function() {
		return (this.buffer.length <= 0);
	}
	
	return EnemyBuffer;
})();
