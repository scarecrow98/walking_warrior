class TextBuilder {

    constructor(phaser, text) {
        this.phaser = phaser
        this.text = text
        this.lineBuilder = new LineBuilder()
        this.textStyle = {
            font: '50px Forte',
            fill: '#FCB514',
            align: 'left'
        },
        this.lineHeight = 100
        this.topOffset = 0
        this.padding = 50
    }

    writeText() {
        let words = this.text.split(' ')

        for (let word of words) {
            console.log(word)
            var splitted = 0

            if (this.lineBuilder.wordFits(word) && !word.match(/\r|\n|\r\n/g)) {
                this.lineBuilder.pushWord(word)
            } else {
                splitted = 1;
                let splitByNewLine = word.split(/\r|\n|\r\n/)
                
                this.lineBuilder.pushWord(splitByNewLine.length > 1 ? splitByNewLine[0] : '')
                let line = this.lineBuilder.createLine()
                this.writeLine(line)

                this.lineBuilder.pushWord(splitByNewLine.length > 1 ? splitByNewLine[1] : word)
            }
        }
        if(!splitted){
            var line = this.lineBuilder.createLine();
            this.writeLine(line)
            this.writeLine()
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

    setTopOffset(topOffset){
        this.topOffset = topOffset
    }

    writeLine(text) {
        this.phaser.add.text(this.padding, this.topOffset * this.lineHeight + this.padding, text, this.textStyle)
        this.topOffset++
    }

    writeLineToPos(posX, posY, text) {
        this.phaser.add.text(posX, posY, text, this.textStyle)
    }

}
