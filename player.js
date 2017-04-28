var Player = (function(){
	var Player = function() {
		this.sprite = new Sprite( null );
		this.sprite.scale = 0.2;
		this.deadCounter = 0;
	}
	var p = Player.prototype;

	p.GetPos = function() {
		return this.sprite.pos;
	}
	
	p.Update = function(key) {
		if (this.sprite.image == null) {
			this.sprite.image = renderer.image;
		}
		if (this.deadCounter > 0) {
			--this.deadCounter;
			return;
		}
		var dir = key.Dir();
		if (dir != DIR.NONE) {
			var speed = 6;
			this.sprite.pos = vecAdd( this.sprite.pos, vecScale( DIRTABLE[dir], speed ) );
			this.sprite.pos.x = clamp(this.sprite.pos.x, 10, SPRCOORD_WIDTH -10);
			this.sprite.pos.y = clamp(this.sprite.pos.y, 10, SPRCOORD_HEIGHT-10);
		}
	}

	p.Draw = function() {
		if (this.IsDead()) {
			return;
		}
		renderer.RegisterSprite(this.sprite);
	}
	
	p.Rect = function() {
		if (this.IsDead()) {
			return null;
		}
		var pos = this.sprite.pos;
		return {left:pos.x-3, right:pos.x+3, top:pos.y-3, bottom:pos.y+3};
	}

	p.Damage = function() {
		SetExplosion(this.sprite.pos);
		this.deadCounter = 2.5 * FPS;
	}

	p.IsDead = function() {
		return this.deadCounter > 0;
	}

	return Player;
})();

var PlayerBuffer = (function(){
	var PlayerBuffer = function() {
		this.buffer = [ new Player()];
	}
	var p = PlayerBuffer.prototype;

	p.getPlayer = function() {
		return this.buffer[0];
	}
	
	p.Update = function(key) {
		this.getPlayer().Update(key);
	}

	p.GetPos = function() {
		return this.getPlayer().GetPos();
	}

	p.IsDead = function() {
		return this.getPlayer().IsDead();
	}

	p.Draw = function() {
		this.getPlayer().Draw();
	}

	return PlayerBuffer;
})();

