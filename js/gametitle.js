var GameTitle = function(game) {};

var levelData = {};

GameTitle.prototype = {

    create: function() {
        if (gameMusic.isPlaying) {
            gameMusic.stop();
        }

        if (!menuMusic.isPlaying) {
            menuMusic.play();
        }

        game.add.tileSprite(0, 0, 1400, 1920, "background")
        let tBuilder = new TextBuilder(game, null)

        tBuilder.setTextStyle({font: "180px Acme",fill: "#ffc61e", align: "center"})
        tBuilder.writeLineToPos(50,50,"Walking Warrior")

        tBuilder.setTextStyle( {font: "70px Acme",fill: "#ffc61e"} )
        tBuilder.writeLineToPos(40,1820,"v2.8")
        //should use month/day/year
        tBuilder.writeLineToPos(1000,1820,"July 24, 2019")


        button = game.add.button(80, 400, 'playbutton', function() {
            var me = this;

            $.post('save-level.php', {
                type: 'get-level'
            }, function(data) {
                try {
                    var levelData = JSON.parse(data);
                    me.startGame(levelData);
                } catch {
                    me.game.state.start("Level1");
                    console.warn("Error querying the server.");
                }
            })
        }, this, 2, 1, 0);
        button.scale.setTo(1.2, 1.2);

        //    button.onInputOver.add(over, this);
        //    button.onInputOut.add(out, this);
        //    button.onInputUp.add(up, this);

        infobutton = game.add.button(700, 400, 'infobutton', function() {
            // this.game.state.start("Description");
            this.game.state.start("Instruction1");
        }, this, 2, 1, 0);
        infobutton.scale.setTo(1.2, 1.2);

        selectbutton = game.add.button(70, 1100, 'selectbutton', function() {
            this.game.state.start("Info");
        }, this, 2, 1, 0);
        selectbutton.scale.setTo(1.2, 1.2);


        stepbutton = game.add.button(900, 1200, 'step', function() {
            this.game.state.start("Counter");
        }, this, 2, 1, 0)
        stepbutton.scale.setTo(0.6, 0.6);

    },

    startGame: function(levelData) {
        //title.stop();      
        savedReplays = levelData.replays;
        savedMoves = levelData.moves;
        savedTileState = levelData.tileState;
        savedScore = levelData.score;
        savedLevel = levelData.level;
        savedCounter1 = levelData.counter1;
        savedCounter2 = levelData.counter2;
        savedCounter3 = levelData.counter3;
        this.game.state.start("Level" + levelData.level);
    }

}