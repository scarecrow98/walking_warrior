var GameTitle = function(game) {};

GameTitle.prototype = {

    create: function() {
        // title = game.add.audio('title');
        // game.sound.setDecodedCallback(title, start, this);

        // function start() {
            // title.loopFull(0.6);
        // }
        game.add.tileSprite(0, 0, 1400, 1920, "background")
        tBuilder = new TextBuilder(game, null)

        tBuilder.setTextStyle( {font: "180px Forte",fill: "#ffc61e", align: "center"} )
        tBuilder.writeLineToPos(50,50,"Walking Warrior")

        tBuilder.setTextStyle( {font: "70px Forte",fill: "#ffc61e"} )
        tBuilder.writeLineToPos(40,1820,"v1.4")
        tBuilder.writeLineToPos(1080,1820,"20.02.2019")

       

        button = game.add.button(460, 300, 'playbutton', actionOnClick, this, 2, 1, 0);
        button.scale.setTo(0.91, 0.91);

        //    button.onInputOver.add(over, this);
        //    button.onInputOut.add(out, this);
        //    button.onInputUp.add(up, this);
        function actionOnClick() {
            //title.destroy();
            me.startGame();

        }
        infobutton = game.add.button(442, 750, 'infobutton', infoOnClick, this, 2, 1, 0);

        function infoOnClick() {
            this.game.state.start("Description");
        }
        selectbutton = game.add.button(442, 1100, 'selectbutton', selectOnClick, this, 2, 1, 0);

        function selectOnClick() {
            this.game.state.start("Info");
        }

        stepbutton = game.add.button(600, 1550, 'step', actionOnClick2, this, 2, 1, 0)
        stepbutton.scale.setTo(0.5, 0.5);

        function actionOnClick2() {
            this.game.state.start("Counter")
        }

    },

    startGame: function() {
        //title.stop();
        replays = 3;
        this.game.state.start("Level1");

    }

}