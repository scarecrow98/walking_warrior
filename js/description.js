var Description = function(game){};

var descriptionText = `Swap 2 neighbor cells to:
1. Make a row or column of 3 identical cells to get points.
2. Make a row or column of 4 identical cells to get extra points and a bonus cell. Bonus cells look like normal cells in circle.
3. Make a row or column of 3 identical cells containing a bonus cell to get extra moves.
4. Make matches in the shape of T or L to get potassium or magnesium.
Other moves:
5. Click potassium when you want to clear a row of cells
6. Click magnesium when you want to clear a column of cells
7. Click the switch button to switch two cells without creating a match (this costs 3 moves)
8. Click the X button to erase a cell (this costs 2 moves)
9. After level 3, you must walk 500 steps. There are additional  steps required to be taken for higher levels.
`

Description.prototype = {

  create: function () {
    game.add.tileSprite(0, 0, 1400, 1920, "background");

    console.log();

    textBuilder = new TextBuilder(game, descriptionText)
    textBuilder.writeText()

    button = game.add.button(1230, 1600, 'backbutton', actionOnClick2, this, 2, 1, 0);
    button.scale.setTo(0.8,0.8);

    function actionOnClick2 () {
      //title.destroy();
    this.game.state.start("GameTitle");
    }
  }
}
