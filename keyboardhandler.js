var KeyboardHandler = (function(){
	BITS = {
		UP:    1,
		DOWN:  2,
		LEFT:  4,
		RIGHT: 8,
		SHOT:  16,
	};
	var KeyboardHandler = function() {
		this.key       = [];
		this.bits_now  = 0;
		this.bits_prev = 0;
		this.bits_edge = 0;
		
		var self = this;
		document.addEventListener("keydown", function(e) {
			self.key[e.key] = true;
		});
		document.addEventListener("keyup", function(e) {
			self.key[e.key] = false;
		});
	}
	var p = KeyboardHandler.prototype;

	p.Update = function() {
		this.bits_prev = this.bits_now;
		this.bits_now  = this.bits();
		this.bits_edge = this.bits_prev ^ this.bits_now;
	}

	p.bits = function() {
		return	(this.Up()    ? BITS.UP    : 0) |
				(this.Down()  ? BITS.DOWN  : 0) |
				(this.Left()  ? BITS.LEFT  : 0) |
				(this.Right() ? BITS.RIGHT : 0) |
				(this.Shot()  ? BITS.SHOT  : 0);
	}

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
	p.Start = function() { return this.isPushEdge(BITS.SHOT); }

	p.isKey = function(key_code) { return (this.key[key_code] == true); }
	p.isPushEdge = function(bit) { return (this.bits_edge & bit) && (this.bits_now & bit); }

	return KeyboardHandler;
})();
