var TitleScene = (function(){
	
	var TitleScene = function() {
		this.spr = new Sprite( null );
		this.spr.scale = 0.5;
		var self = this;
		this.phaseProc = function(){ self.idling(); }
		this.counter   = 0;
	}
	var p = TitleScene.prototype;

	p.Update = function() {
		renderer.Clear_SpriteBuffer();
		renderer.bgstar.Update();

		if (this.spr.image == null) {
			this.spr.image = renderer.images["psk"];
		}
		this.phaseProc();
	}

	p.registerSprite = function() {
		renderer.RegisterSprite(this.spr);
	}
	
	p.idling = function() {
		this.registerSprite();
		if (keyboard.Start()) {
			this.counter = 2.5 * FPS;
			var self = this;
			this.phaseProc = function(){ self.ready(); }
		}
	}

	p.ready = function() {
		if (this.counter & 2) {
			this.registerSprite();
		}
		if (--this.counter > 0) {
			return;
		}

		scenemanager.StartGameScene();
	}

	return TitleScene;
})();

var GameScene = (function(){
	var GameScene = function() {
		this.logic = new Logic();
	}
	var p = GameScene.prototype;

	p.Update = function() {
		this.logic.Update();
	}

	return GameScene;
})();

var SceneManager = (function(){
	var SceneManager = function() {
		this.scene = null;

		this.StartTitleScene();
	}
	var p = SceneManager.prototype;

	p.Update = function() {
		this.scene.Update();
	}

	p.StartTitleScene = function() {
		this.scene = new TitleScene();
	}
	p.StartGameScene = function() {
		this.scene = new GameScene();
	}

	return SceneManager;
})();

