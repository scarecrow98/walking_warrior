var Preload = function(game){};

Preload.prototype = {

	preload: function(){ 
           
           
		this.game.load.image('1', 'assets/Nerve Cell.png');
		this.game.load.image('2', 'assets/neutrophil.png');
		this.game.load.image('3', 'assets/platelet.png');
		this.game.load.image('4', 'assets/Redbloodcell.png');
		this.game.load.image('5', 'assets/Stem Cell.png');
		this.game.load.image('6', 'assets/white blood cell.png');
                this.game.load.image('7', 'assets/BNerve Cell.png');
                this.game.load.image('8', 'assets/bneutrophil.png');
                this.game.load.image('9', 'assets/bplatelet.png');
                this.game.load.image('10', 'assets/BRedbloodcell.png');
                this.game.load.image('11', 'assets/BStem Cell.png');
                this.game.load.image('12', 'assets/bwhite blood cell.png');
                this.game.load.image('13', 'assets/nomatch.png');
                this.game.load.image('14', 'assets/nomove.png');
                this.game.load.image('15', 'assets/Magnesium.png');
                this.game.load.image('16', 'assets/Potassium.png');
                this.game.load.spritesheet('playbutton', 'assets/startbutton.png');
                this.game.load.spritesheet('infobutton', 'assets/infobutton.png');
                this.game.load.spritesheet('selectbutton', 'assets/selectbutton.png');
                this.game.load.spritesheet('backbutton', 'assets/backbutton.png');
                this.game.load.spritesheet('sandbox', 'assets/sandbox.png');
                this.game.load.spritesheet('1button', 'assets/1button.png');
                this.game.load.spritesheet('2button', 'assets/2button.png');
                this.game.load.spritesheet('3button', 'assets/3button.png');
                this.game.load.spritesheet('4button', 'assets/4button.png');
                this.game.load.spritesheet('5button', 'assets/5button.png');
                this.game.load.spritesheet('6button', 'assets/6button.png');
                this.game.load.spritesheet('7button', 'assets/7button.png');
                this.game.load.spritesheet('8button', 'assets/8button.png');
                this.game.load.spritesheet('9button', 'assets/9button.png');
                this.game.load.spritesheet('10button', 'assets/10button.png');
                this.game.load.spritesheet('11button', 'assets/11button.png');
                this.game.load.spritesheet('12button', 'assets/12button.png');
                this.game.load.spritesheet('13button', 'assets/13button.png');
                this.game.load.spritesheet('14button', 'assets/14button.png');
                this.game.load.spritesheet('15button', 'assets/15button.png');
                this.game.load.spritesheet('16button', 'assets/16button.png');
                this.game.load.spritesheet('17button', 'assets/17button.png');
                this.game.load.spritesheet('18button', 'assets/18button.png');
                this.game.load.spritesheet('19button', 'assets/19button.png');
                this.game.load.spritesheet('20button', 'assets/20button.png');
                this.game.load.spritesheet('21button', 'assets/21button.png');
                this.game.load.spritesheet('22button', 'assets/22button.png');
                this.game.load.spritesheet('23button', 'assets/23button.png');
                
                this.game.load.spritesheet('switch', 'assets/switch.png');
                this.game.load.spritesheet('redswitch', 'assets/redswitch.png');
                this.game.load.spritesheet('delete', 'assets/delete.png');
                this.game.load.spritesheet('reddelete', 'assets/reddelete.png');
                this.game.load.image("background", "assets/background.jpg");
                this.game.load.image("background2", "assets/background2.jpg");
                this.game.load.audio('title', 'assets/title.mp3');
                this.game.load.audio('game', 'assets/game.mp3');
                this.game.load.spritesheet('step', 'assets/step.png')
	},

	create: function(){
          
		this.game.state.start("GameTitle");
	}
}