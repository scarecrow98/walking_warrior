class TextBuilder {

    constructor(phaser) {
        this.phaser = phaser
        this.textStyle = {
            font: '50px Forte',
            fill: '#FCB514',
            align: 'left'
        },
        this.lineHeight = 40
        this.rowCount = 0
    }

    setTextStyle(style) {
        this.textStyle = style;
    }

    setLineHeight(lineHeight) {
        this.lineHeight = lineHeight
    }

    writeLine(text, leftPadding = 10) {
        this.phaser.game.add.text(leftPadding, this.rowCount * this.lineHeight, text, this.textStyle)
        rowCount++
    }

}
