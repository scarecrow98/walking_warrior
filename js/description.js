var Description = function(game){};

Description.prototype = {

	create: function(){
            var me =this;
             background = game.add.tileSprite(0, 0, 1400, 1920, "background");
            var text1 = "1. Make a row or column of 3 identical cells to get points.";
    var style = { font: "50px Forte", fill: "#FCB514", align: "center" };
    var t1 = this.game.add.text(40, 80, text1, style);

    var text0 = "Swap 2 neighbor cells to:"
             var t0 = this.game.add.text(40, 20, text0, style);

                var text2 = "2. Make a row or column of 4 identical cells to get extra points ";
  
    var t2 = this.game.add.text(40, 160, text2, style);
    
                var text3 = "and a bonus cell. Bonus cells look like normal cells in circle.";
  
    var t3 = this.game.add.text(45, 240, text3, style);
    
                var text4 = "3. Make a row or column of 3 identical cells containing a ";
  
    var t4 = this.game.add.text(40, 320, text4, style);
    
                var text5 = "bonus cell to get extra moves.";
 
    var t5 = this.game.add.text(45, 400, text5, style);
    
                var text6 = "4. Make matches in the shape of T or L to get potassium or";
  
    var t6 = this.game.add.text(40, 480, text6, style);
    
                var text7 = " magnesium.";
 
    var t7 = this.game.add.text(45, 560, text7, style);

    var textother = "Other moves:";
    var tother = this.game.add.text(45, 640, textother, style);
    
     var text8 = "5. Click potassium when you want to clear a row of cells";
 
    var t8 = this.game.add.text(45, 720, text8, style);
    
     var text9 = "6. Click magnesium when you want to clear a column of cells";
 
    var t9 = this.game.add.text(40, 800, text9, style);
    
     var text10 = "7. Click the switch button to switch two cells without creating a";
 
    var t10 = this.game.add.text(40, 880, text10, style);
    
     var text11 = "match (this costs 3 moves)";
 
    var t11 = this.game.add.text(45, 960, text11, style);
    
     var text12 = "8. Click the X button to erase a cell (this costs 2 moves)";
 
    var t12 = this.game.add.text(40, 1040, text12, style);
    
      var text13 = "9. After level 3, you must walk 500 steps. There are additional";
 
    var t13 = this.game.add.text(40, 1120, text13, style);
      
      var text14 = " steps required to be taken for higher levels.";
    
    var t14 = this.game.add.text(45, 1200, text14, style);

    button = game.add.button(1230, 1600, 'backbutton', actionOnClick2, this, 2, 1, 0);
        button.scale.setTo(0.8,0.8);
     
    function actionOnClick2 () {
        //title.destroy();
    this.game.state.start("GameTitle");

	}
  }
}
