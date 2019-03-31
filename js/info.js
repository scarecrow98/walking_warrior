var Info = function(game) {};

Info.prototype = {

    create: function() {
        
        background = game.add.tileSprite(0, 0, 1400, 1920, "background");

        tBuilder = new TextBuilder(game, null)
        bBuilder = new ButtonBuilder(game, this)

        tBuilder.setTextStyle( {font: "110px Forte", fill: "#ffc61e"} )
        tBuilder.writeLineToPos(450,50,"Select Level")

        tBuilder.setTextStyle( {font: "60px Forte", fill: "#ffc61e"} )
        tBuilder.writeLineToPos(50,470,"Practice Levels")
        tBuilder.writeLineToPos(50,1200,"Token Levels")
        







        button = game.add.button(1230, 1600, 'backbutton', actionOnClick2, this, 2, 1, 0);
        button.scale.setTo(0.8, 0.8);
        sandboxbutton = game.add.button(100, 260, 'sandbox', actionOnClick3, this, 2, 1, 0);
        button1 = game.add.button(100, 560, '1button', actionOnClick4, this, 2, 1, 0);
        button1.scale.setTo(0.33, 0.33);
        button2 = game.add.button(100, 780, '2button', actionOnClick5, this, 2, 1, 0);
        button2.scale.setTo(0.34, 0.25);
        button3 = game.add.button(70, 960, '3button', actionOnClick6, this, 2, 1, 0);
        button3.scale.setTo(1.1, 1.2);
        button4 = game.add.button(90, 1250, '4button', actionOnClick7, this, 2, 1, 0);
        button4.scale.setTo(1.15, 1.15);
        button5 = game.add.button(100, 1450, '5button', actionOnClick8, this, 2, 1, 0);
        button6 = game.add.button(100, 1680, '6button', actionOnClick9, this, 2, 1, 0);
        button7 = game.add.button(500, 560, '7button', actionOnClick10, this, 2, 1, 0);
        button7.scale.setTo(0.35, 0.35);
        button8 = game.add.button(340, 710, '8button', actionOnClick11, this, 2, 1, 0);
        button8.scale.setTo(1.98, 1.98);
        button9 = game.add.button(500, 960, '9button', actionOnClick12, this, 2, 1, 0);
        button9.scale.setTo(0.34, 0.35);
        button10 = game.add.button(500, 1150, '10button', actionOnClick13, this, 2, 1, 0);
        button10.scale.setTo(1.25, 1.25);
        button11 = game.add.button(520, 1330, '11button', actionOnClick14, this, 2, 1, 0);
        button11.scale.setTo(1.35, 1.35);
        button12 = game.add.button(540, 1540, '12button', actionOnClick15, this, 2, 1, 0);
        button12.scale.setTo(0.7, 0.7);
        button13 = game.add.button(510, 1730, '13button', actionOnClick16, this, 2, 1, 0);
        button13.scale.setTo(0.75, 0.95);
        button14 = game.add.button(850, 540, '14button', actionOnClick17, this, 2, 1, 0);
        button14.scale.setTo(1.4, 1.4);
        button15 = game.add.button(850, 770, '15button', actionOnClick18, this, 2, 1, 0);
        button15.scale.setTo(0.3, 0.3);
        button16 = game.add.button(850, 960, '16button', actionOnClick19, this, 2, 1, 0);
        button16.scale.setTo(0.3, 0.3);
        button17 = game.add.button(850, 1150, '17button', actionOnClick20, this, 2, 1, 0);
        button17.scale.setTo(0.7, 0.7);
        button18 = game.add.button(830, 1290, '18button', actionOnClick21, this, 2, 1, 0);
        button18.scale.setTo(0.27, 0.25);
        button19 = game.add.button(860, 1530, '19button', actionOnClick22, this, 2, 1, 0);
        button19.scale.setTo(0.5, 0.5);
        button20 = game.add.button(850, 1700, '20button', actionOnClick23, this, 2, 1, 0);
        button20.scale.setTo(0.23, 0.23);
        button21 = game.add.button(1180, 540, '21button', actionOnClick24, this, 2, 1, 0);
        button21.scale.setTo(0.75, 0.75);
        button22 = game.add.button(1160, 750, '22button', actionOnClick25, this, 2, 1, 0);
        button22.scale.setTo(1.33, 1.33);
        button23 = game.add.button(1130, 940, '23button', actionOnClick26, this, 2, 1, 0);
        button23.scale.setTo(1.35, 1.45);
        //    button.onInputOver.add(over, this);
        //    button.onInputOut.add(out, this);
        //    button.onInputUp.add(up, this);
        /*function actionOnClick2() {
            //title.destroy();
            this.game.state.start("GameTitle");

        }

        function actionOnClick3() {
            //title.destroy();
            this.game.state.start("Main");

        }

        function actionOnClick4() {
            //title.destroy();
            replays = 3;
            this.game.state.start("Level1");

        }

        function actionOnClick5() {
            //title.destroy();
            replays = 3;
            this.game.state.start("Level2");

        }

        function actionOnClick6() {
            //title.destroy();
            replays = 3;
            this.game.state.start("Level3");

        }

        function actionOnClick7() {
            //title.destroy();
            replays = 3;
            this.game.state.start("Level4");

        }

        function actionOnClick8() {
            //title.destroy();
            replays = 3;
            this.game.state.start("Level5");

        }

        function actionOnClick9() {
            //title.destroy();
            replays = 3;
            this.game.state.start("Level6");

        }

        function actionOnClick10() {
           //title.destroy();
            replays = 3;
            this.game.state.start("Level7");

        }

        function actionOnClick11() {
            //title.destroy();
            replays = 3;
            this.game.state.start("Level8");

        }

        function actionOnClick12() {
            //title.destroy();
            replays = 3;
            this.game.state.start("Level9");

        }

        function actionOnClick13() {
            //title.destroy();
            replays = 3;
            this.game.state.start("Level10");

        }

        function actionOnClick14() {
            //title.destroy();
            replays = 3;
            this.game.state.start("Level11");

        }

        function actionOnClick15() {
            //title.destroy();
            replays = 3;
            this.game.state.start("Level12");

        }

        function actionOnClick16() {
            //title.destroy();
            replays = 3;
            this.game.state.start("Level13");

        }

        function actionOnClick17() {
            //title.destroy();
            replays = 3;
            this.game.state.start("Level14");

        }

        function actionOnClick18() {
            //title.destroy();
            replays = 3;
            this.game.state.start("Level15");

        }

        function actionOnClick19() {
            //title.destroy();
            replays = 3;
            this.game.state.start("Level16");

        }

        function actionOnClick20() {
            //title.destroy();
            replays = 3;
            this.game.state.start("Level17");

        }

        function actionOnClick21() {
            //title.destroy();
            replays = 3;
            this.game.state.start("Level18");

        }

        function actionOnClick22() {
            //title.destroy();
            replays = 3;
            this.game.state.start("Level19");

        }

        function actionOnClick23() {
            //title.destroy();
            replays = 3;
            this.game.state.start("Level20");

        }

        function actionOnClick24() {
            //title.destroy();
            replays = 3;
            this.game.state.start("Level21");

        }

        function actionOnClick25() {
            //title.destroy();
            replays = 3;
            this.game.state.start("Level22");

        }

        function actionOnClick26() {
            //title.destroy();
            replays = 3;
            this.game.state.start("Level23");

        }*/

    }
}