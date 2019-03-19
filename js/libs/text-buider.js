class TextBuilder {

    constructor(text, phaser) {
        this.text = text
        this.lineBuilder = new LineBuilder()
        this.phaser = phaser
        this.textStyle = {
            font: '50px Forte',
            fill: '#FCB514',
            align: 'left'
        },
        this.lineHeight = 40
        this.rowCount = 0
    }

    writeText() {
        let words = this.text.split(' ')
        
        for (let word of words) {
            if (this.lineBuilder.wordFits(word) && word.slice(-1) != '\n') {
                this.lineBuilder.pushWord(word)
            } else {
                let line = this.lineBuilder.createLine()
                this.writeLine(line)
            }
        }
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
