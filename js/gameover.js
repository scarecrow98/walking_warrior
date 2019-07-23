var GameOver = function (game) { };
var steps = 0;
var myShakeEvent = new Shake();

GameOver.prototype = {
   create: function () {
      steps = 0;
      var me = this;

      background = game.add.tileSprite(0, 0, 1400, 1920, "background");
      var gameover_label = "Game over";
      var walk_label1 = "You have lost all of your tokens";
      var walk_label2 = "please walk 20 steps to get more!";
      var steps_label = "Open the Android app and get\nback when you're done.";
      var style = { font: "100px Acme", fill: "#ffc61e", align: "center" };

      this.game.add.text(520, 100, gameover_label, style);
      this.game.add.text(10, 400, walk_label1, style);
      this.game.add.text(5, 500, walk_label2, style);
      this.game.add.text(30, 650, steps_label, style);

      let bBuilder = new ButtonBuilder(game, this);
		bBuilder.createButton(1200, 1750, 'backbutton', function () {
			this.game.state.start("GameTitle");
      })

   }
}