var GameTitle = function(game) {};

GameTitle.prototype = {

    create: function() {
        // title = game.add.audio('title');
        // game.sound.setDecodedCallback(title, start, this);

        // function start() {
            // title.loopFull(0.6);
        // }
        game.add.tileSprite(0, 0, 1400, 1920, "background")
        let tBuilder = new TextBuilder(game, null)

        tBuilder.setTextStyle({font: "180px Acme",fill: "#ffc61e", align: "center"})
        tBuilder.writeLineToPos(50,50,"Walking Warrior")

        tBuilder.setTextStyle( {font: "70px Acme",fill: "#ffc61e"} )
        tBuilder.writeLineToPos(40,1820,"v1.5")
        //should use month/day/year
        tBuilder.writeLineToPos(1000,1820,"April 17, 2019")

       

        button = game.add.button(460, 300, 'playbutton', function() {
            this.startGame();
        }, this, 2, 1, 0);
        button.scale.setTo(0.91, 0.91);

        //    button.onInputOver.add(over, this);
        //    button.onInputOut.add(out, this);
        //    button.onInputUp.add(up, this);

        infobutton = game.add.button(442, 750, 'infobutton', function() {
            // this.game.state.start("Description");
            this.game.state.start("Instruction1");
        }, this, 2, 1, 0);

        selectbutton = game.add.button(442, 1100, 'selectbutton', function() {
            this.game.state.start("Info");
        }, this, 2, 1, 0);


        stepbutton = game.add.button(600, 1550, 'step', function() {
            this.game.state.start("Counter");
        }, this, 2, 1, 0)
        stepbutton.scale.setTo(0.5, 0.5);

    },

    startGame: function() {
        //title.stop();
        replays = 3;
        this.game.state.start("Level1");

    }

}