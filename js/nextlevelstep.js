var NextLevelStep = function (game) { };
var steps = 0;
var myShakeEvent = new Shake();

NextLevelStep.prototype = {
   create: function () {

      s = 3;
      steps = 0;

      var me = this;

      background = game.add.tileSprite(0, 0, 1400, 1920, "background");
      //var gameover_label = "Game over";
      var walk_label1 = "Please walk 500 steps to ";
      var walk_label2 = "continue to Level 4!";
      var steps_label = "Steps:";
      var stepcount = steps;
      var style = { font: "100px Forte", fill: "#ffc61e", align: "center" };
      var style2 = { font: "200px Arial", fill: "#ff2800", align: "center" };

      //this.game.add.text(520, 100, gameover_label, style);
      this.game.add.text(140, 400, walk_label1, style);
      this.game.add.text(240, 500, walk_label2, style);
      this.game.add.text(600, 700, steps_label, style);
      var cucc = this.game.add.text(650, 900, stepcount, style2);

      // button = game.add.button(460, 1200, 'playbutton', StartCount, this, 2, 1, 0);
      // button.scale.setTo(0.91, 0.91);

      game.add.button(1200, 1750, 'backbutton', backToMenu, this, 2, 1, 0);

      function restart() {
         me.restartGame();
      }

      function StartCount() {
         myShakeEvent.start();

         window.addEventListener('shake', doSteps, false);
      }

      function backToMenu() {
         me.game.state.start('GameTitle')
      }

      function doSteps() {
         steps++;
         cucc.text = steps;

         if (steps == 500) {
            
            myShakeEvent.stop();
           this.game.state.start("NextLevel");
         }
      }
   },
}