var Zako2 = (function(){
	var Zako2 = function() {
		this.remove = false; // 削除されたいときにtrueにする
	}
	var p = Zako2.prototype;

	// 更新処理
	p.Update = function(playerpos, enemyshot) {
	}

	// コリジョン矩形を返す left,right,top,bottom
	p.Rect = function() {

	}

	// ダメージを受けたときに呼ばれる
	p.Damage = function() {
	}

	return Zako2;
})();
