class Instruction1 extends Instruction {
    constructor(game) {
        super(game)
    }

    create() {
        this.game.stage.backgroundColor = '#ccecff'
        
        this.game.add.tileSprite(100, 120, 1200, 1175, "instruction1")

        this.createNavButtons('GameTitle', 'Instruction2')
    }
}