var WaitSection = (function(){
	var WaitSection = function(count) {
		this.data_count = count;
		this.count      = 0;
	}
	var p = WaitSection.prototype;

	p.Init = function() {
		this.count = this.data_count;
	}
	
	p.Update = function() {
		--this.count;
	}

	p.IsEnd = function() {
		return (this.count <= 0);
	}
	
	return WaitSection;
})();

var ZakoSection = (function(){

	// type    :雑魚種類
	// count   :出現数
	// interval:出現間隔
	var ZakoSection = function(type, count, interval) {
		this.data_type     = type;
		this.data_count    = count;
		this.data_interval = interval;

		this.count         = 0;
		this.interval      = 0;
	}
	var p = ZakoSection.prototype;

	p.Init = function() {
		this.count    = this.data_count;
		this.interval = 0;
	}

	p.Update = function() {
		if (this.count <= 0) {
			return;
		}
		if (--this.interval <= 0) {
			// 敵を発生させる
			GetEnemyBuffer().Generate( this.data_type );
			--this.count;
			this.interval = this.data_interval;
		}
	}

	p.IsEnd = function() {
		return (this.count <= 0);
	}

	return ZakoSection;
})();

var BossSection = (function(){
	var BossSection = function(type) {
		this.data_type = type;
	}
	var p = BossSection.prototype;

	p.Init = function() {
		// 敵を発生させる
		GetEnemyBuffer().Generate( this.data_type );
	}

	p.Update = function() {
	}

	p.IsEnd = function() {
		return GetEnemyBuffer().IsEmpty();
	}

	return BossSection;
})();

var Data = [
	new WaitSection( 1.5*FPS),
//	new ZakoSection( EnemyType.Zako1, 30, 0.5*FPS),
	new ZakoSection( EnemyType.Zako1, 5, 0.5*FPS),
	new WaitSection( 4*FPS),
	new BossSection( EnemyType.Boss1),
	new WaitSection( 4*FPS),
/*
	new ZakoSection( EnemyType.Zako1, 30, 0.5*FPS),
	new WaitSection( 5*FPS),
	new BossSection( EnemyType.Boss1),
	new WaitSection( 4*FPS),

	new ZakoSection( EnemyType.Zako1, 30, 0.5*FPS),
	new WaitSection( 5*FPS),
	new BossSection( EnemyType.Boss1),
  */
];

var GameController = (function(){
	var GameController = function( eventcallback, eventreceiver ) {
		this.eventcallback = eventcallback;
		this.eventreceiver = eventreceiver;
		this.index         = 0;
		this.section       = null;

		this.startSection(this.index);
	}
	var p = GameController.prototype;

	p.Update = function() {
		if (this.section == null) {
			return;
		}
		
		this.section.Update();
		if (!this.section.IsEnd()) {
			return;
		}

		if (++this.index < Data.length) {
			// 次のセクションへ
			this.startSection(this.index);
		}
		else {
			// クリア
			this.section = null;
			this.eventcallback.call(this.eventreceiver, "allclear");
		}
	}

	p.startSection = function(index) {
		this.section = Data[index];
		this.section.Init();
	}

	return GameController;
})();
