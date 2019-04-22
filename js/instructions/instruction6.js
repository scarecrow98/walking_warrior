class Instruction6 extends Instruction {
    constructor(game) {
        super(game)
    }

    create() {
        this.game.stage.backgroundColor = '#ccecff'

        this.game.add.tileSprite(100, 120, 1200, 1192, "instruction6")

        this.createNavButtons('Instruction5', 'Instruction7')
    }
}