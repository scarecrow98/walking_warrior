var Install = function (game) {};

Install.prototype = {
	create: function () {
		game.stage.backgroundColor = '#006bb4';

		let text = 'Instructions on how to install the APK file of the Pedometer App:';
		text += '\n•Click the link at the bottom of the screen to download the APK file to your device.';
		text += '\n•Find the file in your download folder and tap it to install.';
		text += '\n•Adroid might show you a message that it cannot install unknown apps. In this case go to the settings and enable the system to install apps from unknown source. (Usually it\'s under Settings > Security > Install unknown apps)';
		text += '\n•Try installing the app again. Hopefully you can now start using the step counter.';

		textBuilder = new TextBuilder(game, text);
		textBuilder.setTextStyle({
			font: '60px Acme',
			fill: '#FCB514',
		});
		textBuilder.writeText();

		let bBuilder = new ButtonBuilder(game, this);
		bBuilder.createButton(1200, 1750, 'backbutton', function () {
			this.game.state.start("GameTitle");
		})

		bBuilder.createButton(500, 1750, 'nextbutton', function() {
			window.open('android/ww_pedometer.apk');
		 })
	}
}