var Info = function(game) {};

Info.prototype = {

    create: function() {
        
        game.add.tileSprite(0, 0, 1400, 1920, "background");

        let tBuilder = new TextBuilder(game, null)
        let bBuilder = new ButtonBuilder(game, this)

        tBuilder.setTextStyle({font: "110px Acme", fill: "#ffc61e"})
        tBuilder.writeLineToPos(450,50,"Select Level")

        tBuilder.setTextStyle({font: "60px Acme", fill: "#ffc61e"})
        tBuilder.writeLineToPos(60, 250, "Practice Levels")
        tBuilder.writeLineToPos(80, 1000, "Token Levels")

        bBuilder.createButton(1200, 1750, 'backbutton', function() {
            this.game.state.start("GameTitle")
        });


        //button grid for selecting level
        let topOffset = 320
        let leftOffset = 120

        for (i = 0; i < 4; i++) {
            for (j = 0; j < 6; j++) {
                let index = (j + i * 6) + 1
                if (index < 24) {
                    bBuilder.createLevelButton(i * 280 + leftOffset, j * 240 + topOffset, `${index}button`, `Level${index}`)
                } else {
                    //24. button
                    bBuilder.createButton(i * 280 + leftOffset, j * 240 + topOffset, 'sandbox', function() {
                        this.game.state.start("Main");
                    })
                }
            }
        }


        //    button.onInputOver.add(over, this);
        //    button.onInputOut.add(out, this);
        //    button.onInputUp.add(up, this);

    }
}