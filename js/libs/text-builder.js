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
        this.lineHeight = 100
        this.rowCount = 0
        this.padding = 30
    }

    writeText() {
        let words = this.text.split(' ')

        for (let word of words) {
            console.log(word)

            if (this.lineBuilder.wordFits(word) && !word.match(/\r|\n|\r\n/g)) {
                this.lineBuilder.pushWord(word)
            } else {
                let splitByNewLine = word.split(/\r|\n|\r\n/)
                
                this.lineBuilder.pushWord(splitByNewLine.length > 1 ? splitByNewLine[0] : '')
                let line = this.lineBuilder.createLine()
                this.writeLine(line)

                this.lineBuilder.pushWord(splitByNewLine.length > 1 ? splitByNewLine[1] : word)
            }
        }
    }

    setTextStyle(style) {
        this.textStyle = style;
    }

    setPadding(padding) {
        this.padding = padding
    } 

    setLineHeight(lineHeight) {
        this.lineHeight = lineHeight
    }

    writeLine(text) {
        this.phaser.game.add.text(this.padding, this.rowCount * this.lineHeight + this.padding, text, this.textStyle)
        this.rowCount++
    }

}
