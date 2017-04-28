var Logic = (function(){
	var Logic = function() {
		this.key       = new KeyboardHandler();

		this.player    = new PlayerBuffer();
		this.myshot    = new MyShotBuffer();
		this.enemy     = new EnemyBuffer();
		this.enemyshot = new EnemyShotBuffer();
		this.explosion = new ExplosionBuffer();
	}
	var p = Logic.prototype;

	p.Update = function() {
		renderer.Clear_SpriteBuffer();
		renderer.bgstar.Update();

		this.player    .Update(this.key);
		this.myshot    .Update(this.key, this.player.GetPos());
		this.enemy     .Update(this.player.GetPos(), this.enemyshot);
		this.enemyshot .Update();
		this.explosion .Update();

		var self = this;
		this.hitCheck( this.enemy,  this.myshot,    function(enemy, myshot) { self.enemy_myshot(enemy ,myshot); });
		this.hitCheck( this.player, this.enemyshot, function(player,eshot)  { self.player_eshot(player,eshot);  });
		this.hitCheck( this.player, this.enemy,     function(player,enemy)  { self.player_enemy(player,enemy);  });
		
		this.remove( this.myshot    );
		this.remove( this.enemy     );
		this.remove( this.enemyshot );

		this.enemy    .Draw();
		this.explosion.Draw();
		this.myshot   .Draw();
		this.enemyshot.Draw();
		this.player   .Draw();
	}

	p.remove = function(container) {
		container.buffer = container.buffer.filter(function(element,array,index){
			return !element.remove;
		});
	}

	p.hitCheck = function(containerA, containerB, func) {
		containerA.buffer.forEach(function(objA,arrayA,indexA) {
			var rectA = objA.Rect();
			if (rectA) {
				containerB.buffer.forEach(function(objB,arrayB,indexB) {
					var rectB = objB.Rect();
					if (rectB) {
						if (checkCross(rectA, rectB)) {
							func(objA, objB);
						}
					}
				},this);
			}
		},this);
	}
	
	p.enemy_myshot = function(enemy, myshot) {
		enemy.Damage();
		myshot.remove = true;
	}

	p.player_eshot = function(player, eshot) {
		player.Damage();
		eshot.remove = true;
	}

	p.player_enemy = function(player, enemy) {
		player.Damage();
		enemy.Damage();
	}

	return Logic;
})();

function IsDead_Player() {
	return logic.player.getPlayer().IsDead();
}

function SetExplosion(pos) {
	logic.explosion.SetExplosion(pos);
}