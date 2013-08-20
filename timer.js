// V0.0.0

// ==========================================
// Copyright 2013 Dataminr
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// work derived from http://closure-library.googlecode.com/svn/docs/closure_goog_ui_component.js.source.html
// ==========================================


define([], function() {

	var Timer = function() {
		this.times = [];
		this.current = [];
		this.fns = [];
		this.running = false;
		this.timeout = null;
		this.lastRun = 0;
	}

	Timer.prototype.add = function(fn, time) {
		var now = (new Date()).getTime();

		var run = this.running ? (+(new Date()) - this.lastRun) : 0;

		this.fns.push(fn);
		this.times.push(time);
		this.current.push(time + run);
		if (this.running) {
			this.stop();
			this.start();
		}
	};

	Timer.prototype.remove = function(fn) {
		var index = this.fns.indexOf(fn);
		this.fns.splice(index, 1);
		this.times.splice(index, 1);
		this.current.splice(index, 1);
	};

	Timer.prototype.reset = function(fn) {
		if (fn) {
			var index = this.fns.indexOf(fn);
			this.current[index] = this.times[index];
			return;
		}
		this.current = [].slice.call(this.times, 0);
	};

	Timer.prototype.start = function(fn) {
		if (fn) {
			var index = this.fns.indexOf(fn);
			this.current[index] = this.times[index];
			return;
		}
		this.running = true;
		this.lastRun = +(new Date());
		this.interval = Math.min.apply(null, this.current);
		var that = this;
		this.timeout = setTimeout(function() {
			that.run_();
		}, this.interval);
	};

	Timer.prototype.stop = function(fn) {
		if (fn) {
			this.current[this.fns.indexOf(fn)] = Infinity;
			return;
		}
		var diff = +(new Date()) - this.lastRun;
		clearTimeout(this.timeout);
		for (var i = 0; i < this.current.length; i++) {
			this.current[i] = this.current[i] - diff;
		}
	};

	Timer.prototype.run_ = function() {
		var now = +(new Date());
		for (var i = 0; i < this.current.length; i++) {
			this.current[i] = this.current[i] - (now - this.lastRun);
			if (this.current[i] <= 0) {
				this.fns[i]();
				this.current[i] += this.times[i];
			}
		}
		this.start();
	};

	return Timer;
});