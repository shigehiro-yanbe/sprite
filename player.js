var Player = (function(){
	var Player = function() {
		var player = new Sprite( null );
		player.scale = 0.2;
		this.buffer = [player];
	}
	var p = Player.prototype;

	p.Update = function(key) {
		var player = this.buffer[0];
		if (player.image == null) {
			player.image = renderer.image;
		}
		var dir = key.Dir();
		if (dir != DIR.NONE) {
			var speed = 10;
			player.pos = vecAdd( player.pos, vecScale( DIRTABLE[dir], speed ) );
			player.pos.x = clamp(player.pos.x, 10, SPRCOORD_WIDTH -10);
			player.pos.y = clamp(player.pos.y, 10, SPRCOORD_HEIGHT-10);
		}
	}

	p.GetPos = function() {
		return this.buffer[0].pos;
	}

	p.Draw = function() {
		renderer.RegisterSprite(this.buffer[0]);
	}

	return Player;
})();

