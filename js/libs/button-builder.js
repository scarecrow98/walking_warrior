class ButtonBuilder {

    constructor(phaser, context) {
        this.phaser = phaser
        this.context = context
    }

    createButton(posX, posY, key, levelName) {
        //game.add.button(100, 560, '1button', actionOnClick4, this, 2, 1, 0);
        this.phaser.add.button(posX, posY, key, function(){
            replays = 3;
            this.game.state.start(levelName);
        }, this.context)
    }

}
