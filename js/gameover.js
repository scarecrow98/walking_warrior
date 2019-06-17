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
      var stepcount = steps;
      var style = { font: "100px Forte", fill: "#ffc61e", align: "center" };
      var style2 = { font: "200px Arial", fill: "#ff2800", align: "center" };

      this.game.add.text(520, 100, gameover_label, style);
      this.game.add.text(10, 400, walk_label1, style);
      this.game.add.text(5, 500, walk_label2, style);
      this.game.add.text(30, 650, steps_label, style);
      // var cucc = this.game.add.text(650, 900, stepcount, style2);

      // button = game.add.button(460, 1200, 'playbutton', StartCount, this, 2, 1, 0);
      // button.scale.setTo(0.91, 0.91);

      function restart() {
         me.restartGame();
      }

      // function StartCount() {
      //    myShakeEvent.start();

      //    window.addEventListener('shake', doSteps, false);
      // }

      // function doSteps() {
      //    steps++;
      //    cucc.text = steps;

      //    if (steps == 20) {
      //       myShakeEvent.stop();

      //       $.post("../ajax.php", {
      //          type: 'updatesteps',
      //          step: steps
      //       });

      //       // $.post("../ajax.php", {
      //       //    type: 'updatetokens',
      //       //    token: tokens
      //       // });

      //       button2 = game.add.button(1000, 1520, 'backbutton', restart, this, 2, 1, 0);
      //       button2.scale.setTo(0.8, 0.8);
      //    }
      // }
   },

   restartGame: function () {
      this.game.state.start("GameTitle");
   }
}