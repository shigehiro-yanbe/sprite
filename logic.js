var Logic = (function(){
	var Logic = function() {
		this.player     = new PlayerBuffer();
		this.myshot     = new MyShotBuffer();
		this.enemy      = new EnemyBuffer();
		this.enemyshot  = new EnemyShotBuffer();
		this.explosion  = new ExplosionBuffer();
		this.playerLeft = 3; // 開始時は3
		this.gameovercounter = 0;

		--this.playerLeft; // 最初の出撃で1減らす
	}
	var p = Logic.prototype;

	p.Update = function() {
		renderer.Clear_SpriteBuffer();
		renderer.bgstar.Update();

		this.player    .Update(keyboard);
		this.myshot    .Update(keyboard, this.player.GetPos());
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
		this.player   .Draw();
		this.enemyshot.Draw();

		if (this.gameovercounter > 0) {
			if (--this.gameovercounter <= 0) {
				scenemanager.StartTitleScene();
			}
		}
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
		this.playerDamage(player);
		eshot.remove = true;
	}

	p.player_enemy = function(player, enemy) {
		this.playerDamage(player);
		enemy.Damage();
	}

	p.playerDamage = function(player) {
		if (!player.Damage()) {
			return;
		}
		if (this.playerLeft >= 1) {
			--this.playerLeft;
			return;
		}

		// ゲームオーバー
		player.NoResurrect();
		this.gameovercounter = 5*FPS;
	}

	return Logic;
})();

function IsEnableBullets() {
	return scenemanager.scene.logic.player.GetPlayer().IsEnableBullets();
}

function SetExplosion(pos) {
	scenemanager.scene.logic.explosion.SetExplosion(pos);
}
