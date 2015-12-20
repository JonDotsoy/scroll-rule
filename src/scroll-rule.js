// Anony block
(function (W) {
	"use strict";

	// Scan Scroll
	var scanScroll = function (scroll) {

		try {

			for (var ruleIndex in this.rules) {
				var rule = this.rules[ruleIndex];

				// Filter Rule if exists rule and callback
				if (Boolean(rule.rule) && Boolean(rule.callback)) {
					var e = eval(String(scroll||0) + rule.rule);

					if (e) {
						rule.callback(scroll);
					}

				}

			}

		} catch (ex) {}

	}


	/* Element Scroll */
	var ScrollRule = function (target) {
		this.rules = [];

		// Evento scropt in target
		target.addEventListener("scroll", function (event) {
			setTimeout(function (resolve, reject) {
				(scanScroll).apply(this, [target.scrollY || target.scrollTop]);
			}.bind(this), 1);
			// new Promise(function (resolve, reject) {
			// 	(scanScroll).apply(this, [target.scrollY || target.scrollTop]);
			// 	resolve();
			// }.bind(this));
		}.bind(this));
	}

	ScrollRule.prototype.ScrollRule = ScrollRule;

	ScrollRule.prototype.rule = function(rule, cb) {
		this.rules.push({rule: rule, callback: cb});
	};



	// Window ScrollRule
	W.ScrollRule = new ScrollRule(W);


	// Scroll Top Plugin
	W.addEventListener("load", function () {

		if (W.screenY == 0) {
			document.body.setAttribute("scroll-top","scroll-top")
			document.body.removeAttribute("no-scroll-top");
		} else {
			document.body.setAttribute("no-scroll-top","no-scroll-top")
			document.body.removeAttribute("scroll-top");
		}

		var stateTop = true;
		W.ScrollRule.rule("==0", function () {
			if (stateTop == false) {
				document.body.setAttribute("scroll-top","scroll-top")
				document.body.removeAttribute("no-scroll-top");
			}
			stateTop = true;
		});

		W.ScrollRule.rule("!=0", function () {
			if (stateTop == true) {
				document.body.setAttribute("no-scroll-top","no-scroll-top")
				document.body.removeAttribute("scroll-top");
			}
			stateTop = false;
		});

	});

})(window);

