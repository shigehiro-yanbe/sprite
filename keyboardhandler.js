var KeyboardHandler = (function(){
	var KeyboardHandler = function() {
		this.key = [];
		
		var self = this;
		document.addEventListener("keydown", function(e) {
			self.key[e.key] = true;
		});
		document.addEventListener("keyup", function(e) {
			self.key[e.key] = false;
		});
	}
	var p = KeyboardHandler.prototype;

	p.Dir = function() {
		if (this.Up()) {
			if (this.Right()) { return DIR.UPRIGHT; }
			if (this.Left())  { return DIR.UPLEFT;  }
			return DIR.UP;
		}
		if (this.Down()) {
			if (this.Right()) { return DIR.DOWNRIGHT; }
			if (this.Left())  { return DIR.DOWNLEFT;  }
			return DIR.DOWN;
		}
		if (this.Right()) { return DIR.RIGHT; }
		if (this.Left())  { return DIR.LEFT;  }
		return DIR.NONE;
	}
	p.Up    = function() { return this.isKey("ArrowUp"); }
	p.Down  = function() { return this.isKey("ArrowDown"); }
	p.Left  = function() { return this.isKey("ArrowLeft"); }
	p.Right = function() { return this.isKey("ArrowRight"); }
	p.Shot  = function() { return this.isKey(" "); }

	p.isKey = function(key_code) { return (this.key[key_code] == true); }

	return KeyboardHandler;
})();
