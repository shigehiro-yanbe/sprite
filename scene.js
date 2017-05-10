var TitleScene = (function(){
	var TitleScene = function() {
	}
	var p = TitleScene.prototype;

	p.Update = function() {
		renderer.bgstar.Update();
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
		//this.scene = new TitleScene();
		this.scene = new GameScene();
	}
	var p = SceneManager.prototype;

	p.Update = function() {
		this.scene.Update();
	}

	return SceneManager;
})();

