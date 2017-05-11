var PhaseNormal = (function(){
	var PhaseNormal = function() {
	}
	var p = PhaseNormal.prototype;

	p.Update = function() {
	}

	return PhaseNormal;
})();

var PhaseGameOver = (function(){
	var PhaseGameOver = function() {
		this.counter = 5*FPS;
		this.spr  = new Sprite( renderer.images["gameover"] );
		this.spr.scale = 0.5;
	}
	var p = PhaseGameOver.prototype;

	p.Update = function() {
		renderer.RegisterSprite(this.spr);
		if (--this.counter <= 0) {
			scenemanager.StartTitleScene();
		}
	}

	return PhaseGameOver;
})();

var PhaseAllClear = (function(){
	var PhaseAllClear = function() {
		this.spr = new Sprite( renderer.images["complete"] );
		this.spr.scale = 0.5;
	}
	var p = PhaseAllClear.prototype;

	p.Update = function() {
		renderer.RegisterSprite( this.spr );
	}

	return PhaseAllClear;
})();

var Logic = (function(){
	var Logic = function() {
		this.player         = new PlayerBuffer();
		this.myshot         = new MyShotBuffer();
		this.enemy          = new EnemyBuffer();
		this.enemyshot      = new EnemyShotBuffer();
		this.explosion      = new ExplosionBuffer();
		this.playerLeft     = 3; // 開始時は3
		this.phaseProc      = new PhaseNormal();
		this.gamecontroller = new GameController( p.eventCallback, this );

		--this.playerLeft; // 最初の出撃で1減らす
	}
	var p = Logic.prototype;

	p.Update = function() {
		renderer.Clear_SpriteBuffer();
		renderer.bgstar.Update();

		this.gamecontroller.Update();
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

		this.phaseProc.Update();
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
		this.phaseProc = new PhaseGameOver();
	}

	p.eventCallback = function(event) {
		if (event === "allclear") {
			console.log("eventcallback");
			console.log(event);
			this.phaseProc = new PhaseAllClear();
		}
	}

	return Logic;
})();

function IsEnableBullets() {
	return scenemanager.scene.logic.player.GetPlayer().IsEnableBullets();
}

function SetExplosion(pos) {
	scenemanager.scene.logic.explosion.SetExplosion(pos);
}

function GetEnemyBuffer() {
	return scenemanager.scene.logic.enemy;
}
