// 画面下から登場、無敵
var PlayerEntryProc = (function(){
	var PlayerEntryProc = function(player) {
		this.player = player;
		player.sprite.pos.y = SPRCOORD_HEIGHT+30;
		player.isInvincible    = true;
		player.isControllable  = false;
		player.isDead          = false;
		player.isEnableBullets = false;
	}
	var p = PlayerEntryProc.prototype;

	p.Update = function(){
		//console.log("entry" + this.player.sprite.pos.y);
		var pos = this.player.sprite.pos;
		pos.y -= 2;
		if (pos.y <= SPRCOORD_HEIGHT-30) {
			this.player.phaseProc = new PlayerWarmupProc(this.player);
		}
	}

	return PlayerEntryProc;
})();

// 操作可能、無敵
var PlayerWarmupProc = (function(){
	var PlayerWarmupProc = function(player) {
		this.player = player;
		this.counter = 1.5*FPS;
		player.isInvincible    = true;
		player.isControllable  = true;
		player.isDead          = false;
		player.isEnableBullets = true;
	}
	var p = PlayerWarmupProc.prototype;

	p.Update = function() {
		//console.log("warmup");
		if (--this.counter <= 0) {
			this.player.phaseProc = new PlayerControllableProc(this.player);
		}
	}

	return PlayerWarmupProc;
})();

// 操作可能、ダメージ判定あり
var PlayerControllableProc = (function(){
	var PlayerControllableProc = function(player) {
		this.player = player;
		player.isInvincible    = false;
		player.isControllable  = true;
		player.isDead          = false;
		player.isEnableBullets = true;
	}
	var p = PlayerControllableProc.prototype;

	p.Update = function() {
		//console.log("controllable");
	}

	return PlayerControllableProc;
})();

// 死亡中
var PlayerDeadProc = (function(){
	var PlayerDeadProc = function(player) {
		this.player = player;
		this.counter = 1.5*FPS;
		player.isInvincible    = true;
		player.isControllable  = false;
		player.isDead          = true;
		player.isEnableBullets = false;
	}
	var p = PlayerDeadProc.prototype;

	p.Update = function() {
		//console.log("dead");
		if (--this.counter <= 0) {
			this.player.phaseProc = new PlayerEntryProc(this.player);
		}
	}

	return PlayerDeadProc;
})();


//=============================================================================
var Player = (function(){
	var Player = function() {
		this.sprite = new Sprite( null );
		this.sprite.scale = 0.13;
		this.isInvincible    = false;
		this.isControllable  = false;
		this.isDead          = false;
		this.isEnableBullets = false;
		this.phaseProc = new PlayerEntryProc(this);
	}
	var p = Player.prototype;

	p.GetPos = function() {
		return this.sprite.pos;
	}
	
	p.Update = function(key) {
		if (this.sprite.image == null) {
			this.sprite.image = renderer.images["apm"];
		}
		this.phaseProc.Update();

		if (this.IsControllable()) {
			var dir = key.Dir();
			if (dir != DIR.NONE) {
				var speed = 6;
				this.sprite.pos = vecAdd( this.sprite.pos, vecScale( DIRTABLE[dir], speed ) );
				this.sprite.pos.x = clamp(this.sprite.pos.x, 10, SPRCOORD_WIDTH -10);
				this.sprite.pos.y = clamp(this.sprite.pos.y, 10, SPRCOORD_HEIGHT-10);
			}
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
		if (this.IsInvincible()) {
			return;
		}
		SetExplosion(this.sprite.pos);
		this.phaseProc = new PlayerDeadProc(this);
	}

	p.IsDead = function() {
		return this.isDead;
	}
	p.IsControllable = function() {
		return this.isControllable;
	}
	p.IsInvincible = function() {
		return this.isInvincible;
	}
	p.IsEnableBullets = function() {
		return this.isEnableBullets;
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

	p.IsEnableBullets = function() {
		return this.getPlayer().IsEnableBullets();
	}

	p.Draw = function() {
		this.getPlayer().Draw();
	}

	return PlayerBuffer;
})();

