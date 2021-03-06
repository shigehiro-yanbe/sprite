var renderer     = new Renderer(CANVAS_WIDTH, CANVAS_HEIGHT);
var scenemanager = new SceneManager();
var keyboard     = new KeyboardHandler();

var App = (function(){
	var App = function() {
		this.isIdle = true;
		this.startTime = 0;
		this.prevFrame = 0;

		var self = this;
		renderer.LoadResource( function(){ self.start(); });
	}
	var p = App.prototype;

	p.start = function() {
		this.startTime = window.performance.now();
		this.loop();
	}

	p.loop = function(){
		var frame = this.calcFrame();
		for (var i = 0; i < frame; ++i) {
			this.core();
		}

		var self = this;
		window.requestAnimationFrame( function(){ self.loop(); } );
	}

	p.core = function() {
		keyboard.Update();
		scenemanager.Update();
		renderer.Render();
	}

	p.calcFrame = function() {
		var nowframe = Math.floor((window.performance.now() - this.startTime) * 3 / (3000 / FPS));
		var progress = nowframe - this.prevFrame;
		if (progress <= 0) {
			return 0;
		}

		// 長時間バックグラウンドにいたときの対策
		if (progress >= 3) {
			progress = 3;
		}
		this.prevFrame = nowframe;
		return progress;
	}

	return App;
})();
