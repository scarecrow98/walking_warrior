class TextBuilder {

    constructor(text, phaser) {
        this.phaser = phaser
        this.text = text
        this.textStyle = {
            font: '50px Forte',
            fill: '#FCB514',
            align: 'left'
        }
    }

    setTextStyle(style) {
        this.textStyle = style;
    }

    writeLine(x, y, text) {
        phaser.game.add.text(x, y, text, this.textStyle)
    }

}
