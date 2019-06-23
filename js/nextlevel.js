var NextLevel = function (game) {};

NextLevel.prototype = {


	create: function () {
		var me = this;

		background = game.add.tileSprite(0, 0, 1400, 1920, "background");;
		var text = "Level Completed!!";
		var style = {
			font: "100px Arial",
			fill: "#000",
			align: "center"
		};
		var t = this.game.add.text(320, 100, text, style);
		button = game.add.button(460, 400, 'playbutton', actionOnClick, this, 2, 1, 0);
		button.scale.setTo(0.91, 0.91);

		//    button.onInputOver.add(over, this);
		//    button.onInputOut.add(out, this);
		//    button.onInputUp.add(up, this);
		function actionOnClick() {
			
			me.restartGame();
		}

	},

	restartGame: function () {
		if (s == 1) {
			this.game.state.start("Level2");
		}
		if (s == 2) {
			this.game.state.start("Level3");
		}
		if (s == 3) {
			this.game.state.start("Level4");
		}
		if (s == 4) {
			this.game.state.start("Level5");
		}
		if (s == 5) {
			this.game.state.start("Level6");
		}
		if (s == 6) {
			this.game.state.start("Level7");
		}
		if (s == 7) {
			this.game.state.start("Level8");
		}
		if (s == 8) {
			this.game.state.start("Level9");
		}
		if (s == 9) {
			this.game.state.start("Level10");
		}
		if (s == 10) {
			this.game.state.start("Level11");
		}
		if (s == 11) {
			this.game.state.start("Level12");
		}
		if (s == 12) {
			this.game.state.start("Level13");
		}
		if (s == 13) {
			this.game.state.start("Level14");
		}
		if (s == 14) {
			this.game.state.start("Level15");
		}
		if (s == 15) {
			this.game.state.start("Level16");
		}
		if (s == 16) {
			this.game.state.start("Level17");
		}
		if (s == 17) {
			this.game.state.start("Level18");
		}
		if (s == 18) {
			this.game.state.start("Level19");
		}
		if (s == 19) {
			this.game.state.start("Level20");
		}
		if (s == 20) {
			this.game.state.start("Level21");
		}
		if (s == 21) {
			this.game.state.start("Level22");
		}
		if (s == 22) {
			this.game.state.start("Level23");
		}
		if (s == 23) {
			this.game.state.start("Level23");
		}

	}

}