var logic    = new Logic();
var renderer = new Renderer(CANVAS_WIDTH, CANVAS_HEIGHT);

var App = (function(){
	var App = function() {
		this.isIdle = true;

		var self = this;
		renderer.LoadResource( function(){ self.start(); });
	}
	var p = App.prototype;

	p.start = function() {
		var self = this;
		setInterval( function(){ self.loop(); }, 1000/FPS );
	}

	p.loop = function() {
		if (this.isIdle) {
			this.isIdle = false;
			logic.Update();
			renderer.Render();
			this.isIdle = true;
		}
	}

	return App;
})();