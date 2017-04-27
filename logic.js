var Logic = (function(){
	var Logic = function() {
		this.key       = new KeyboardHandler();

		this.player    = new Player();
		this.myshot    = new MyShot();
		this.enemy     = new Enemy();
		this.enemyshot = new EnemyShot();
	}
	var p = Logic.prototype;

	p.Update = function() {
		renderer.Clear_SpriteBuffer();
		renderer.bgstar.Update();

		this.player    .Update(this.key);
		this.myshot    .Update(this.key, this.player.GetPos());
		this.enemy     .Update(this.player.GetPos(), this.enemyshot);
		this.enemyshot .Update();

		var self = this;
		this.hitCheck( this.myshot,    this.enemy,  function(shot  ,enemy)  { self.shot_enemy  (shot  ,enemy);  });
		this.hitCheck( this.enemyshot, this.player, function(eshot ,player) { self.eshot_player(eshot ,player); });
		this.hitCheck( this.player,    this.enemy,  function(player,enemy)  { self.player_enemy(player,enemy);  });
		
		this.remove( this.myshot    );
		this.remove( this.enemy     );
		this.remove( this.enemyshot );
		/*
		console.log("myshot:"+this.myshot.buffer.length+
					" enemy:"+this.enemy.buffer.length+
					" eshot:"+this.enemyshot.buffer.length);
		  */

		this.enemy    .Draw();
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
			containerB.buffer.forEach(function(objB,arrayB,indexB) {
				if (checkCross(rectA, objB.Rect())) {
					func(objA, objB);
				}
			},this);
		},this);
	}
	
	p.shot_enemy = function(shot,enemy) {
		shot.remove = true;
		enemy.Damage();
	}

	p.eshot_player = function(eshot,player) {
		eshot.remove = true;
		console.log("hit!!");
	}

	p.player_enemy = function(player, enemy) {
		console.log("hit!!");
		enemy.remove = true;
	}

	return Logic;
})();

