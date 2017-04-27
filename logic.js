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

		this.enemy    .Draw();
		this.myshot   .Draw();
		this.enemyshot.Draw();
		this.player   .Draw();
	}

	return Logic;
})();

