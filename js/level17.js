var Level17 = function (game) {

};

Level17.prototype = {

	create: function () {

		var me = this;

		$.post("../ajax.php", {
			type: 'gettokens'
		}, function (data) {
			var obj = JSON.parse(data);

			background = game.add.tileSprite(0, 0, 1400, 1920, "background");

			//Declare assets that will be used as tiles
			me.tileTypes = [
				'1', //nervecell
				'2', //neutrophil
				'3', //platelet
				'4', //redbloodcell
				'5', //stemcell
				'6', //whitebloodcell
				'7', //bnerve
				'8', //bneutro
				'9', //bplat
				'10', //bredb
				'11', //bstemc
				'12', //bwhiteblood
				'13', // nomatch
				'14', // nomove
				'15', // magnesium
				'16', // potassium

			];

			me.tileOffset = 200

			//Keep track of the users score
			s = 23;
			//   replays = 3;
			me.score = 0;
			me.moves = 35;
			me.replays = obj.tokens;
			me.wasmove = false;
			me.firsttime = true;
			me.switches = false;
			me.delete = false;
			me.count = 0;
			me.lort = false;
			me.lortcount = 0;
			me.bonuscount = 0;
			//Keep track of the tiles the user is trying to swap (if any)
			me.activeTile1 = null;
			me.activeTile2 = null;

			//Controls whether the player can make a move or not
			me.canMove = false;

			//Grab the weigh and height of the tiles (assumes same size for all tiles)
			me.tileWidth = 200 //me.game.cache.getImage('1').width;
			me.tileHeight = 200 //me.game.cache.getImage('1').height;

			//This will hold all of the tile sprites
			me.tiles = me.game.add.group();

			//Initialise tile grid, this array will hold the positions of the tiles
			//Create whatever shape you'd like
			me.tileGrid = [
				[null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null, null, null]


			];

			//Create a random data generator to use later
			var seed = Date.now();
			me.random = new Phaser.RandomDataGenerator([seed]);

			//Set up some initial tiles and the score label
			if (!gameMusic.isPlaying) {
				gameMusic.play();
				menuMusic.stop();
			}
	
			me.initTiles();
			me.createScore();
			me.createMoves();
			me.createReplays();
			me.createSwitch();
			me.text3Label.text = "Make bonustiles(" + me.bonuscount + "/3) and L-s or T-s(" + me.lortcount + "/2)";
			me.createDelete();

		});
		button = game.add.button(10, 1600, 'backbutton', actionOnClick2, this, 2, 1, 0);
		button.scale.setTo(0.8, 0.8);

		function actionOnClick2() {
			this.game.state.start("GameTitle");
		}

	},

	nothing: function () {
		var me = this;

	},

	update: function () {

		var me = this;
		if (me.bonuscount >= 3 && me.lortcount >= 2) {
			replays = me.replays;
			$.post("../ajax.php", {
				type: 'minustokens'
			});

			$.post("../ajax.php", {
				ype: 'updatescore',
				score: me.score
			});

			$.post("../ajax.php", {
				type: 'highestlevel',
				gamelevel: 17
			});
			this.game.state.start("NextLevel");
		}
		if (me.replays <= 0) {

			me.replays = 1;

			$.post("../ajax.php", {
				type: 'updatetokens',
				token: 1
			});

			this.game.state.start("GameOver");
		}

		if (me.moves <= 0) { //restart part
			var me = this;


			me.incrementPlays();

			for (var i = 0; i < me.tileGrid.length; i++) {
				for (var j = 0; j < me.tileGrid[i].length; j++) {

					var tile = me.tileGrid[i][j];
					var tilePos = me.getTilePos(me.tileGrid, tile);

					//Find where this tile lives in the theoretical grid
					var tilePos = me.getTilePos(me.tileGrid, tile);

					//Remove the tile from the screent
					me.tiles.remove(tile);


					//Remove the tile from the theoretical grid
					if (tilePos.x != -1 && tilePos.y != -1) {
						me.tileGrid[tilePos.x][tilePos.y] = null;
					}
				}
			}


			me.text3Label.text = "Out of Moves - Restarting";


			me.wasmove = false;
			me.firsttime = true;

			me.initTiles();
			me.moves = 35;
			me.movesLabel.text = me.moves;
			me.score = 0;
			me.scoreLabel.text = "Score: " + me.score;
		}


		//The user is currently dragging from a tile, so let's see if they have dragged
		//over the top of an adjacent tile
		if (me.activeTile1 && !me.activeTile2) {
			if (me.delete == true) { //delete part
				me.tiles.remove(me.activeTile1);
				var tilePos = me.getTilePos(me.tileGrid, me.activeTile1);

				//Remove the tile from the theoretical grid
				if (tilePos.x != -1 && tilePos.y != -1) {
					me.tileGrid[tilePos.x][tilePos.y] = null;
				}
				me.delete = false;
				me.resetTile();

				me.tileUp();
				me.createDelete();
				me.moves -= 2;
				me.movesLabel.text = me.moves;

				me.resetTile();
				me.fillTile(0);
				me.resetTile();
				var once = 0;
				var refreshIntervalId = setInterval(function () {
					me.checkMatch();
					if (once == 1) {
						clearInterval(refreshIntervalId);
					}
					once += 1;
				}, 300)


			}
			if (me.activeTile1 != null) {
				if (me.activeTile1.tileType == 16) { //potassium part
					var tilePos = me.getTilePos(me.tileGrid, me.activeTile1);
					for (var i = 0; i < me.tileGrid.length; i++) {
						var tile = me.tileGrid[i][tilePos.y];
						me.tiles.remove(tile);
						if (tilePos.x != -1 && tilePos.y != -1) {
							me.tileGrid[i][tilePos.y] = null;
						}

					}
					me.resetTile();
					me.fillTile(0);
					var once = 0;
					var refreshIntervalId = setInterval(function () {
						me.checkMatch();
						if (once == 1) {
							clearInterval(refreshIntervalId);
						}
						once += 1;
					}, 300)
					me.tileUp();
				}
			}
			if (me.activeTile1 != null) {
				if (me.activeTile1.tileType == 15) { //magnesium part
					var tilePos = me.getTilePos(me.tileGrid, me.activeTile1);
					for (var j = 0; j < me.tileGrid[0].length; j++) {
						var tile = me.tileGrid[tilePos.x][j];
						me.tiles.remove(tile);
						if (tilePos.x != -1 && tilePos.y != -1) {
							me.tileGrid[tilePos.x][j] = null;
						}

					}
					me.resetTile();
					me.fillTile(0);
					var once = 0;
					var refreshIntervalId = setInterval(function () {
						me.checkMatch();
						if (once == 1) {
							clearInterval(refreshIntervalId);
						}
						once += 1;
					}, 300)
					me.tileUp();
				}
			}
			//Get the location of where the pointer is currently
			var hoverX = me.game.input.x - me.tileOffset;
			var hoverY = me.game.input.y;

			//Figure out what position on the grid that translates to
			var hoverPosX = Math.floor(hoverX / me.tileWidth);
			var hoverPosY = Math.floor(hoverY / me.tileHeight);

			//See if the user had dragged over to another position on the grid
			var difX = (hoverPosX - me.startPosX);
			var difY = (hoverPosY - me.startPosY);

			//Make sure we are within the bounds of the grid
			if (!(hoverPosY > me.tileGrid[0].length - 1 || hoverPosY < 0) && !(hoverPosX > me.tileGrid.length - 1 || hoverPosX < 0)) {

				//If the user has dragged an entire tiles width or height in the x or y direction
				//trigger a tile swap
				if ((Math.abs(difY) == 1 && difX == 0) || (Math.abs(difX) == 1 && difY == 0)) {

					//Prevent the player from making more moves whilst checking is in progress
					me.canMove = false;

					//Set the second active tile (the one where the user dragged to)
					me.activeTile2 = me.tileGrid[hoverPosX][hoverPosY];

					//Swap the two active tiles
					me.swapTiles();

					//After the swap has occurred, check the grid for any matches
					me.game.time.events.add(300, function () {
						me.checkMatch();
					});
				}

			}

		}

	},

	//We don't actuall use this function, but it can trigger the game over state
	gameOver: function () {
		this.game.state.start('GameOver');
	},

	initTiles: function () {

		var me = this;

		//Loop through each column in the grid
		console.log(me.tileGrid.length);
		console.log(me.tileGrid[1].length);
		console.log("me.tileGrid.length");
		for (var i = 0; i < me.tileGrid.length; i++) {

			//Loop through each position in a specific column, starting from the top
			for (var j = 0; j < me.tileGrid[i].length; j++) {

				//Add the tile to the game at this grid position
				var tile = me.addTile(i, j, 0);
				me.count = 0;
				//Keep a track of the tiles position in our tileGrid
				me.tileGrid[i][j] = tile;

			}
		}

		//Once the tiles are ready, check for any matches on the grid
		me.game.time.events.add(300, function () {
			me.checkMatch();
		});

	},

	addTile: function (x, y, type) {

		var me = this;

		//Choose a random tile to add
		if (type == 0) {
			if (me.count != 10) {
				var tileToAdd = me.tileTypes[me.random.integerInRange(0, 5)];
				me.count += 1;

			}


			if (me.count == 10) {
				var tileToAdd = me.tileTypes[12];
				me.count += 1;

			}
			if (me.count == 22) {
				var tileToAdd = me.tileTypes[13];
				me.count = 0;
			}

		}
		if (type == 7) {
			console.log("7esvolt");
			var tileToAdd = me.tileTypes[6];
		}
		if (type == 8) {
			console.log("8esvolt");
			var tileToAdd = me.tileTypes[7];
		}
		if (type == 9) {
			console.log("9esvolt");
			var tileToAdd = me.tileTypes[8];
		}
		if (type == 10) {
			console.log("10esvolt");
			var tileToAdd = me.tileTypes[9];
		}
		if (type == 11) {
			console.log("11esvolt");
			var tileToAdd = me.tileTypes[10];
		}
		if (type == 12) {
			console.log("12esvolt");
			var tileToAdd = me.tileTypes[11];
		}
		if (type == 15) {
			console.log("15esvolt");
			var tileToAdd = me.tileTypes[14];

		}
		if (type == 16) {
			console.log("16esvolt");
			var tileToAdd = me.tileTypes[15];
		}


		//Add the tile at the correct x position, but add it to the top of the game (so we can slide it in)
		var tile = me.tiles.create(((x * me.tileWidth) + me.tileWidth / 2) + 200, 0, tileToAdd);

		//Animate the tile into the correct vertical position
		me.game.add.tween(tile).to({
			y: y * me.tileHeight + (me.tileHeight / 2)
		}, 300, Phaser.Easing.Linear.In, true).onComplete.add(function() {
			me.correctTilePosition();
		})

		//Set the tiles anchor point to the center
		tile.anchor.setTo(0.5, 0.5);

		//Enable input on the tile
		tile.inputEnabled = true;

		//Keep track of the type of tile that was added
		tile.tileType = tileToAdd;

		//Trigger the tileDown function whenever the user clicks or taps on this tile
		tile.events.onInputDown.add(me.tileDown, me);

		return tile;

	},

	tileDown: function (tile, pointer) {

		var me = this;

		//Keep track of where the user originally clicked
		if (me.canMove) {
			me.activeTile1 = tile;

			me.startPosX = (tile.x - me.tileOffset - me.tileWidth / 2) / me.tileWidth;
			me.startPosY = (tile.y - me.tileHeight / 2) / me.tileHeight;
		}

	},

	tileUp: function () {

		//Reset the active tiles
		var me = this;
		me.activeTile1 = null;
		me.activeTile2 = null;

	},

	swapTiles: function () {

		var me = this;
		me.text3Label.text = "Make bonustiles(" + me.bonuscount + "/2) and L-s or T-s(" + me.lortcount + "/2)";
		//If there are two active tiles, swap their positions
		if (me.activeTile1 && me.activeTile2) {
			if (me.activeTile1.tileType == 14 || me.activeTile2.tileType == 14) { // for nomove
				me.tileUp();
				return;
			}
			if (Number(me.activeTile1.tileType) > 6 && Number(me.activeTile2.tileType) > 6 && Number(me.activeTile1.tileType) < 13 && Number(me.activeTile2.tileType) < 13) { //for 2 bonustile
				me.tiles.remove(me.activeTile1);
				var tilePos = me.getTilePos(me.tileGrid, me.activeTile1);

				//Remove the tile from the theoretical grid
				if (tilePos.x != -1 && tilePos.y != -1) {
					me.tileGrid[tilePos.x][tilePos.y] = null;
				}


				me.tiles.remove(me.activeTile2);

				var tilePos2 = me.getTilePos(me.tileGrid, me.activeTile2);

				//Remove the tile from the theoretical grid
				if (tilePos2.x != -1 && tilePos2.y != -1) {
					me.tileGrid[tilePos2.x][tilePos2.y] = null;
				}


				me.resetTile();

				me.fillTile(0);
				me.score += 10;
				me.moves += 3;
				me.movesLabel.text = me.moves;
				me.scoreLabel.text = "Score : " + me.score;
				return;
			}

			var tile1Pos = {
				x: (me.activeTile1.x - me.tileWidth / 2) / me.tileWidth,
				y: (me.activeTile1.y - me.tileHeight / 2) / me.tileHeight
			};
			var tile2Pos = {
				x: (me.activeTile2.x - me.tileWidth / 2) / me.tileWidth,
				y: (me.activeTile2.y - me.tileHeight / 2) / me.tileHeight
			};

			var t1Index = {
				x: ((me.activeTile1.x - me.tileOffset) - me.tileWidth / 2) / me.tileWidth,
				y: (me.activeTile1.y - me.tileHeight / 2) / me.tileHeight
			};
			var t2Index = {
				x: ((me.activeTile2.x - me.tileOffset) - me.tileWidth / 2) / me.tileWidth,
				y: (me.activeTile2.y - me.tileHeight / 2) / me.tileHeight
			};

			//console.log(t1Index, t2Index)

			//Swap them in our "theoretical" grid
			me.tileGrid[t1Index.x][t1Index.y] = me.activeTile2;
			me.tileGrid[t2Index.x][t2Index.y] = me.activeTile1;

			//Actually move them on the screen
			me.game.add.tween(me.activeTile1).to({
				x: tile2Pos.x * me.tileWidth + (me.tileWidth / 2),
				y: tile2Pos.y * me.tileHeight + (me.tileHeight / 2)
			}, 100, Phaser.Easing.Linear.In, true);
			me.game.add.tween(me.activeTile2).to({
				x: tile1Pos.x * me.tileWidth + (me.tileWidth / 2),
				y: tile1Pos.y * me.tileHeight + (me.tileHeight / 2)
			}, 100, Phaser.Easing.Linear.In, true);

			me.activeTile1 = me.tileGrid[t1Index.x][t1Index.y];
			me.activeTile2 = me.tileGrid[t2Index.x][t2Index.y];
		}

	},

	checkMatch: function () {

		var me = this;

		//Call the getMatches function to check for spots where there is
		//a run of three or more tiles in a row
		var matches = me.getMatches(me.tileGrid);
		console.log(matches);
		if (matches.length > 0) {
			console.log(matches[0].length);
		}
		//If there are matches, remove them
		if (matches.length > 0) {
			me.wasmove = true;
			//Remove the tiles
			me.removeTileGroup(matches);

			//Move the tiles currently on the board into their new positions
			me.resetTile();

			//Fill the board with new tiles wherever there is an empty spot
			me.fillTile(matches.length);
			me.fillTile(matches.length);
			//Trigger the tileUp event to reset the active tiles
			me.game.time.events.add(300, function () {
				me.tileUp();
			});

			//Check again to see if the repositioning of tiles caused any new matches
			me.game.time.events.add(300, function () {
				me.checkMatch();
			});

		} else {

			//No match so just swap the tiles back to their original position and reset
			if (me.switches == false && me.lort == false) {


				me.swapTiles();
				me.game.time.events.add(300, function () {
					me.tileUp();
					me.canMove = true;
					if (me.wasmove == true && me.firsttime == false) {
						me.incrementMoves();
					}
					me.wasmove = false;
					me.firsttime = false;
				});
			}
			if (me.switches == true) {

				me.moves -= 3;
				me.switches = false;
				me.movesLabel.text = me.moves;
				me.canMove = true;
				me.createSwitch();
				me.tileUp();
			}
			if (me.lort == true) {

				me.moves += 3;
				me.score += 15;
				me.lortcount++;
				//this.game.state.start("NextLevel");

				me.scoreLabel.text = "Score : " + me.score
				me.lort = false;
				me.movesLabel.text = me.moves;
				me.canMove = true;


				me.tileUp();
			}
		}

	},

	correctTilePosition: function() {
		var me = this;

		for (var i = 0; i < me.tileGrid.length; i++) {
			for (var j = 0; j < me.tileGrid[i].length; j++) {
				// var index = {
				// 	x: (tile.x - me.tileOffset - me.tileWidth / 2) / me.tileWidth,
				// 	y: (tile.y - me.tileHeight / 2) / me.tileHeight
				// }

				if (me.tileGrid[i][j]) {
	
					var tilePos = {
						x: (i * me.tileWidth) + me.tileWidth / 2 + me.tileOffset,
						y: (j * me.tileHeight) + (me.tileHeight / 2)
					}
					
					// if (me.tileGrid[i][j].x != tilePos.x || me.tileGrid[i][j].y != tilePos.y) {
					// 	console.warn("tile positon corrected:", tilePos.x, tilePos.y, me.tileGrid[i][j].position);
					// }

					me.tileGrid[i][j].position.setTo(tilePos.x, tilePos.y);
				}
			}
		}
	},

	getMatches: function (tileGrid) {

		var matches = [];
		var groups = [];
		var me = this;
		//L part starting
		for (var i = 0; i < tileGrid.length; i++) {
			var tempArr = tileGrid[i];
			groups = [];
			for (var j = 0; j < tempArr.length; j++) {
				//L part
				if (i < tileGrid.length - 2) {
					if (j < tempArr.length - 2)
						if (typeof tileGrid[i][j] !== 'undefined' && typeof tileGrid[i][j + 1] !== 'undefined' && typeof tileGrid[i][j + 2] !== 'undefined' && typeof tileGrid[i + 2][j + 2] !== 'undefined') {
							if (Number(tileGrid[i][j].tileType) != 12 && Number(tileGrid[i][j].tileType) != 13 && Number(tileGrid[i][j].tileType) == Number(tileGrid[i][j + 1].tileType) && Number(tileGrid[i][j].tileType) == Number(tileGrid[i][j + 2].tileType) && Number(tileGrid[i][j].tileType) == Number(tileGrid[i + 1][j + 2].tileType) && Number(tileGrid[i][j].tileType) == Number(tileGrid[i + 2][j + 2].tileType)) {
								me.lort = true;
								if (groups.length > 0) {
									if (groups.indexOf(tileGrid[i][j]) == -1) {
										matches.push(groups);
										groups = [];
									}
								}
								if (groups.indexOf(tileGrid[i][j]) == -1) {
									groups.push(tileGrid[i][j]);
								}
								if (groups.indexOf(tileGrid[i][j + 1]) == -1) {
									groups.push(tileGrid[i][j + 1]);
									matches.push(groups);
									groups = [];
								}
								if (groups.indexOf(tileGrid[i + 1][j + 2]) == -1) {
									groups.push(tileGrid[i + 1][j + 2]);
								}
								if (groups.indexOf(tileGrid[i + 2][j + 2]) == -1) {
									groups.push(tileGrid[i + 2][j + 2]);
								}
								//if (groups.indexOf(tileGrid[i][j+2]) == -1)
								//{
								//	groups.push(tileGrid[i][j+2]);
								//}
								me.tiles.remove(me.tileGrid[i][j + 2]);
								var tilePos = me.getTilePos(me.tileGrid, me.tileGrid[i][j + 2]);

								//Remove the tile from the theoretical grid
								if (tilePos.x != -1 && tilePos.y != -1) {
									me.tileGrid[tilePos.x][tilePos.y] = null;
								}
								var tile2 = me.addTile(tilePos.x, tilePos.y, 15);
								me.tileGrid[i][j + 2] = tile2;

								matches.push(groups);
								groups = [];
								console.log("LLLLLLLiba");

								break;
							}
						}
				}

				if (i >= 2) {
					if (typeof tileGrid[i][j] !== 'undefined' && typeof tileGrid[i][j + 1] !== 'undefined' && typeof tileGrid[i][j + 2] !== 'undefined' && typeof tileGrid[i - 2][j + 2] !== 'undefined') {

						if (Number(tileGrid[i][j].tileType) != 12 && Number(tileGrid[i][j].tileType) != 13 && Number(tileGrid[i][j].tileType) == Number(tileGrid[i][j + 1].tileType) && Number(tileGrid[i][j].tileType) == Number(tileGrid[i][j + 2].tileType) && Number(tileGrid[i][j].tileType) == Number(tileGrid[i - 1][j + 2].tileType) && Number(tileGrid[i][j].tileType) == Number(tileGrid[i - 2][j + 2].tileType)) {
							me.lort = true;

							if (groups.length > 0) {
								if (groups.indexOf(tileGrid[i][j]) == -1) {
									matches.push(groups);
									groups = [];
								}
							}
							if (groups.indexOf(tileGrid[i][j]) == -1) {
								groups.push(tileGrid[i][j]);
							}
							if (groups.indexOf(tileGrid[i][j + 1]) == -1) {
								groups.push(tileGrid[i][j + 1]);
								matches.push(groups);
								groups = [];
							}
							if (groups.indexOf(tileGrid[i - 1][j + 2]) == -1) {
								groups.push(tileGrid[i - 1][j + 2]);
							}
							if (groups.indexOf(tileGrid[i - 2][j + 2]) == -1) {
								groups.push(tileGrid[i - 2][j + 2]);
							}
							//if (groups.indexOf(tileGrid[i][j+2]) == -1)
							//{
							//	groups.push(tileGrid[i][j+2]);
							//}
							me.tiles.remove(me.tileGrid[i][j + 2]);
							var tilePos = me.getTilePos(me.tileGrid, me.tileGrid[i][j + 2]);

							//Remove the tile from the theoretical grid
							if (tilePos.x != -1 && tilePos.y != -1) {
								me.tileGrid[tilePos.x][tilePos.y] = null;
							}
							var tile2 = me.addTile(tilePos.x, tilePos.y, 15);
							me.tileGrid[i][j + 2] = tile2;

							matches.push(groups);
							groups = [];
							console.log("LLLLLLLiba");


							break;
						}
					}
				}
				if (i < tileGrid.length - 2) {
					if (typeof tileGrid[i][j] !== 'undefined' && typeof tileGrid[i][j + 1] !== 'undefined' && typeof tileGrid[i][j + 2] !== 'undefined' && typeof tileGrid[i + 2][j] !== 'undefined') {
						if (Number(tileGrid[i][j].tileType) != 12 && Number(tileGrid[i][j].tileType) != 13 && Number(tileGrid[i][j].tileType) == Number(tileGrid[i][j + 1].tileType) && Number(tileGrid[i][j].tileType) == Number(tileGrid[i][j + 2].tileType) && Number(tileGrid[i][j].tileType) == Number(tileGrid[i + 1][j].tileType) && Number(tileGrid[i][j].tileType) == Number(tileGrid[i + 2][j].tileType)) {
							me.lort = true;
							if (groups.length > 0) {
								if (groups.indexOf(tileGrid[i][j]) == -1) {
									matches.push(groups);
									groups = [];
								}
							}
							if (groups.indexOf(tileGrid[i][j]) == -1) {
								groups.push(tileGrid[i][j]);
							}
							if (groups.indexOf(tileGrid[i][j + 1]) == -1) {
								groups.push(tileGrid[i][j + 1]);
								matches.push(groups);
								groups = [];
							}
							if (groups.indexOf(tileGrid[i + 1][j]) == -1) {
								groups.push(tileGrid[i + 1][j]);
							}
							if (groups.indexOf(tileGrid[i + 2][j]) == -1) {
								groups.push(tileGrid[i + 2][j]);
							}
							//if (groups.indexOf(tileGrid[i][j+2]) == -1)
							//{
							//	groups.push(tileGrid[i][j+2]);
							//}
							me.tiles.remove(me.tileGrid[i][j + 2]);
							var tilePos = me.getTilePos(me.tileGrid, me.tileGrid[i][j + 2]);

							//Remove the tile from the theoretical grid
							if (tilePos.x != -1 && tilePos.y != -1) {
								me.tileGrid[tilePos.x][tilePos.y] = null;
							}
							var tile2 = me.addTile(tilePos.x, tilePos.y, 15);
							me.tileGrid[i][j + 2] = tile2;

							matches.push(groups);
							groups = [];
							console.log("LLLLLLLiba");
						}
					}
				}
				if (i >= 2) {
					if (typeof tileGrid[i][j] !== 'undefined' && typeof tileGrid[i][j + 1] !== 'undefined' && typeof tileGrid[i][j + 2] !== 'undefined' && typeof tileGrid[i - 2][j] !== 'undefined') {
						if (Number(tileGrid[i][j].tileType) != 12 && Number(tileGrid[i][j].tileType) != 13 && Number(tileGrid[i][j].tileType) == Number(tileGrid[i][j + 1].tileType) && Number(tileGrid[i][j].tileType) == Number(tileGrid[i][j + 2].tileType) && Number(tileGrid[i][j].tileType) == Number(tileGrid[i - 1][j].tileType) && Number(tileGrid[i][j].tileType) == Number(tileGrid[i - 2][j].tileType)) {
							me.lort = true;
							if (groups.length > 0) {
								if (groups.indexOf(tileGrid[i][j]) == -1) {
									matches.push(groups);
									groups = [];
								}
							}
							if (groups.indexOf(tileGrid[i][j]) == -1) {
								groups.push(tileGrid[i][j]);
							}
							if (groups.indexOf(tileGrid[i][j + 1]) == -1) {
								groups.push(tileGrid[i][j + 1]);
								matches.push(groups);
								groups = [];
							}
							if (groups.indexOf(tileGrid[i - 1][j]) == -1) {
								groups.push(tileGrid[i - 1][j]);
							}
							if (groups.indexOf(tileGrid[i - 2][j]) == -1) {
								groups.push(tileGrid[i - 2][j]);
							}
							//if (groups.indexOf(tileGrid[i][j+2]) == -1)
							//{
							//	groups.push(tileGrid[i][j+2]);
							//}
							me.tiles.remove(me.tileGrid[i][j + 2]);
							var tilePos = me.getTilePos(me.tileGrid, me.tileGrid[i][j + 2]);

							//Remove the tile from the theoretical grid
							if (tilePos.x != -1 && tilePos.y != -1) {
								me.tileGrid[tilePos.x][tilePos.y] = null;
							}
							var tile2 = me.addTile(tilePos.x, tilePos.y, 15);
							me.tileGrid[i][j + 2] = tile2;

							matches.push(groups);
							groups = [];
							console.log("LLLLLLLiba");

							break;
						}
					}
				}
				if (i < tileGrid.length - 2) {
					if (typeof tileGrid[i][j] !== 'undefined' && typeof tileGrid[i][j + 1] !== 'undefined' && typeof tileGrid[i][j + 2] !== 'undefined' && typeof tileGrid[i + 2][j + 1] !== 'undefined') {
						if (Number(tileGrid[i][j].tileType) != 12 && Number(tileGrid[i][j].tileType) != 13 && Number(tileGrid[i][j].tileType) == Number(tileGrid[i][j + 1].tileType) && Number(tileGrid[i][j].tileType) == Number(tileGrid[i][j + 2].tileType) && Number(tileGrid[i][j].tileType) == Number(tileGrid[i + 1][j + 1].tileType) && Number(tileGrid[i][j].tileType) == Number(tileGrid[i + 2][j + 1].tileType)) {
							me.lort = true;
							if (groups.length > 0) {
								if (groups.indexOf(tileGrid[i][j]) == -1) {
									matches.push(groups);
									groups = [];
								}
							}
							if (groups.indexOf(tileGrid[i][j]) == -1) {
								groups.push(tileGrid[i][j]);
							}
							if (groups.indexOf(tileGrid[i][j + 1]) == -1) {
								groups.push(tileGrid[i][j + 1]);
								matches.push(groups);
								groups = [];
							}
							if (groups.indexOf(tileGrid[i + 1][j + 1]) == -1) {
								groups.push(tileGrid[i + 1][j + 1]);
							}
							if (groups.indexOf(tileGrid[i + 2][j + 1]) == -1) {
								groups.push(tileGrid[i + 2][j + 1]);
							}
							//if (groups.indexOf(tileGrid[i][j+2]) == -1)
							//{
							//	groups.push(tileGrid[i][j+2]);
							//}
							me.tiles.remove(me.tileGrid[i][j + 2]);
							var tilePos = me.getTilePos(me.tileGrid, me.tileGrid[i][j + 2]);

							//Remove the tile from the theoretical grid
							if (tilePos.x != -1 && tilePos.y != -1) {
								me.tileGrid[tilePos.x][tilePos.y] = null;
							}
							var tile2 = me.addTile(tilePos.x, tilePos.y, 16);
							me.tileGrid[i][j + 2] = tile2;

							matches.push(groups);
							groups = [];
							console.log("LLLLLLLiba");
							break;
						}
					}
				}
				if (i >= 2) {
					if (typeof tileGrid[i][j] !== 'undefined' && typeof tileGrid[i][j + 1] !== 'undefined' && typeof tileGrid[i][j + 2] !== 'undefined' && typeof tileGrid[i - 2][j + 1] !== 'undefined') {
						if (Number(tileGrid[i][j].tileType) != 12 && Number(tileGrid[i][j].tileType) != 13 && Number(tileGrid[i][j].tileType) == Number(tileGrid[i][j + 1].tileType) && Number(tileGrid[i][j].tileType) == Number(tileGrid[i][j + 2].tileType) && Number(tileGrid[i][j].tileType) == Number(tileGrid[i - 1][j + 1].tileType) && Number(tileGrid[i][j].tileType) == Number(tileGrid[i - 2][j + 1].tileType)) {
							me.lort = true;
							if (groups.length > 0) {
								if (groups.indexOf(tileGrid[i][j]) == -1) {
									matches.push(groups);
									groups = [];
								}
							}
							if (groups.indexOf(tileGrid[i][j]) == -1) {
								groups.push(tileGrid[i][j]);
							}
							if (groups.indexOf(tileGrid[i][j + 1]) == -1) {
								groups.push(tileGrid[i][j + 1]);
								matches.push(groups);
								groups = [];
							}
							if (groups.indexOf(tileGrid[i - 1][j + 1]) == -1) {
								groups.push(tileGrid[i - 1][j + 1]);
							}
							if (groups.indexOf(tileGrid[i - 2][j + 1]) == -1) {
								groups.push(tileGrid[i - 2][j + 1]);
							}
							//if (groups.indexOf(tileGrid[i][j+2]) == -1)
							//{
							//	groups.push(tileGrid[i][j+2]);
							//}
							me.tiles.remove(me.tileGrid[i][j + 2]);
							var tilePos = me.getTilePos(me.tileGrid, me.tileGrid[i][j + 2]);

							//Remove the tile from the theoretical grid
							if (tilePos.x != -1 && tilePos.y != -1) {
								me.tileGrid[tilePos.x][tilePos.y] = null;
							}
							var tile2 = me.addTile(tilePos.x, tilePos.y, 16);
							me.tileGrid[i][j + 2] = tile2;

							matches.push(groups);
							groups = [];
							console.log("LLLLLLLiba");
							break;
						}
					}
				}
				if (i < tileGrid.length - 1) {
					if (i >= 1) {
						if (typeof tileGrid[i][j] !== 'undefined' && typeof tileGrid[i][j + 1] !== 'undefined' && typeof tileGrid[i][j + 2] !== 'undefined' && typeof tileGrid[i + 1][j] !== 'undefined' && typeof tileGrid[i - 1][j] !== 'undefined') {
							if (Number(tileGrid[i][j].tileType) != 12 && Number(tileGrid[i][j].tileType) != 13 && Number(tileGrid[i][j].tileType) == Number(tileGrid[i][j + 1].tileType) && Number(tileGrid[i][j].tileType) == Number(tileGrid[i][j + 2].tileType) && Number(tileGrid[i][j].tileType) == Number(tileGrid[i - 1][j].tileType) && Number(tileGrid[i][j].tileType) == Number(tileGrid[i + 1][j].tileType)) {
								me.lort = true;
								if (groups.length > 0) {
									if (groups.indexOf(tileGrid[i][j]) == -1) {
										matches.push(groups);
										groups = [];
									}
								}
								if (groups.indexOf(tileGrid[i][j]) == -1) {
									groups.push(tileGrid[i][j]);
								}
								if (groups.indexOf(tileGrid[i][j + 1]) == -1) {
									groups.push(tileGrid[i][j + 1]);
									matches.push(groups);
									groups = [];
								}
								if (groups.indexOf(tileGrid[i + 1][j]) == -1) {
									groups.push(tileGrid[i + 1][j]);
								}
								if (groups.indexOf(tileGrid[i - 1][j]) == -1) {
									groups.push(tileGrid[i - 1][j]);
								}
								//if (groups.indexOf(tileGrid[i][j+2]) == -1)
								//{
								//	groups.push(tileGrid[i][j+2]);
								//}
								me.tiles.remove(me.tileGrid[i][j + 2]);
								var tilePos = me.getTilePos(me.tileGrid, me.tileGrid[i][j + 2]);

								//Remove the tile from the theoretical grid
								if (tilePos.x != -1 && tilePos.y != -1) {
									me.tileGrid[tilePos.x][tilePos.y] = null;
								}
								var tile2 = me.addTile(tilePos.x, tilePos.y, 16);
								me.tileGrid[i][j + 2] = tile2;

								matches.push(groups);
								groups = [];
								console.log("LLLLLLLiba");
								break;
							}
						}
					}
				}
				if (i >= 1 && i < tileGrid.length - 1) {
					if (tileGrid[i][j] !== 'undefined' && typeof tileGrid[i][j + 1] !== 'undefined' && typeof tileGrid[i][j + 2] !== 'undefined' && typeof tileGrid[i + 1][j + 2] !== 'undefined' && typeof tileGrid[i - 1][j + 2] !== 'undefined') {
						if (Number(tileGrid[i][j].tileType) != 12 && Number(tileGrid[i][j].tileType) != 13 && Number(tileGrid[i][j].tileType) == Number(tileGrid[i][j + 1].tileType) && Number(tileGrid[i][j].tileType) == Number(tileGrid[i][j + 2].tileType) && Number(tileGrid[i][j].tileType) == Number(tileGrid[i - 1][j + 2].tileType) && Number(tileGrid[i][j].tileType) == Number(tileGrid[i + 1][j + 2].tileType)) {
							me.lort = true;
							if (groups.length > 0) {
								if (groups.indexOf(tileGrid[i][j]) == -1) {
									matches.push(groups);
									groups = [];
								}
							}
							if (groups.indexOf(tileGrid[i][j]) == -1) {
								groups.push(tileGrid[i][j]);
							}
							if (groups.indexOf(tileGrid[i][j + 1]) == -1) {
								groups.push(tileGrid[i][j + 1]);
								matches.push(groups);
								groups = [];
							}
							if (groups.indexOf(tileGrid[i + 1][j + 2]) == -1) {
								groups.push(tileGrid[i + 1][j + 2]);
							}
							if (groups.indexOf(tileGrid[i - 1][j + 2]) == -1) {
								groups.push(tileGrid[i - 1][j + 2]);
							}
							//if (groups.indexOf(tileGrid[i][j+2]) == -1)
							//{
							//	groups.push(tileGrid[i][j+2]);
							//}
							me.tiles.remove(me.tileGrid[i][j + 2]);
							var tilePos = me.getTilePos(me.tileGrid, me.tileGrid[i][j + 2]);

							//Remove the tile from the theoretical grid
							if (tilePos.x != -1 && tilePos.y != -1) {
								me.tileGrid[tilePos.x][tilePos.y] = null;
							}
							var tile2 = me.addTile(tilePos.x, tilePos.y, 16);
							me.tileGrid[i][j + 2] = tile2;

							matches.push(groups);
							groups = [];
							console.log("LLLLLLLiba");

							break;
						}
					}
				}
			}
		}
		//L part ending
		//if (me.lort ==true){
		//me.resetTile();
		//me.fillTile(0);
		//setTimeout(function () {
		//	me.checkMatch();
		//}, 500)
		//console.log("LORT");
		//return matches;
		//}     

		//Check for horizontal matches
		for (var i = 0; i < tileGrid.length; i++) {
			var tempArr = tileGrid[i];
			groups = [];
			for (var j = 0; j < tempArr.length; j++) {

				if (j < tempArr.length - 2)
					if (tileGrid[i][j] && tileGrid[i][j + 1] && tileGrid[i][j + 2]) {
						if (Number(tileGrid[i][j].tileType) != 12 && Number(tileGrid[i][j].tileType) != 13 && ((Number(tileGrid[i][j].tileType) == Number(tileGrid[i][j + 1].tileType) && Number(tileGrid[i][j + 1].tileType) == Number(tileGrid[i][j + 2].tileType)) || (Number(tileGrid[i][j].tileType) == Number(tileGrid[i][j + 1].tileType) + 6 && Number(tileGrid[i][j + 1].tileType) == Number(tileGrid[i][j + 2].tileType)) || (Number(tileGrid[i][j].tileType) == Number(tileGrid[i][j + 1].tileType) + 6 && Number(tileGrid[i][j + 1].tileType) == Number(tileGrid[i][j + 2].tileType) - 6) || (Number(tileGrid[i][j].tileType) == Number(tileGrid[i][j + 1].tileType) && Number(tileGrid[i][j + 1].tileType) == Number(tileGrid[i][j + 2].tileType) + 6) || (Number(tileGrid[i][j].tileType) == Number(tileGrid[i][j + 1].tileType) - 6 && Number(tileGrid[i][j + 1].tileType) == Number(tileGrid[i][j + 2].tileType)) || (Number(tileGrid[i][j].tileType) == Number(tileGrid[i][j + 1].tileType) - 6 && Number(tileGrid[i][j + 1].tileType) == Number(tileGrid[i][j + 2].tileType) + 6) || (Number(tileGrid[i][j].tileType) == Number(tileGrid[i][j + 1].tileType) && Number(tileGrid[i][j + 1].tileType) == Number(tileGrid[i][j + 2].tileType) - 6))) {
							if (groups.length > 0) {
								if (groups.indexOf(tileGrid[i][j]) == -1) {
									matches.push(groups);
									groups = [];
								}
							}

							if (groups.indexOf(tileGrid[i][j]) == -1) {
								groups.push(tileGrid[i][j]);
							}
							if (groups.indexOf(tileGrid[i][j + 1]) == -1) {
								groups.push(tileGrid[i][j + 1]);
							}
							if (groups.indexOf(tileGrid[i][j + 2]) == -1) {
								groups.push(tileGrid[i][j + 2]);
							}
						}
					}
			}
			if (groups.length > 0) matches.push(groups);
		}

		//Check for vertical matches
		for (j = 0; j < tileGrid[0].length; j++) {
			// This below will not work on non square tile grids!
			//var tempArr = tileGrid[j];
			// Use something from here instead: https://stackoverflow.com/questions/7848004/get-column-from-a-two-dimensional-array-in-javascript
			var tempArr = tileGrid.map(function (value, index) {
				return value[j];
			});
			groups = [];
			for (i = 0; i < tempArr.length; i++) {
				if (i < tempArr.length - 2)
					if (tileGrid[i][j] && tileGrid[i + 1][j] && tileGrid[i + 2][j]) {
						if (Number(tileGrid[i][j].tileType) != 12 && Number(tileGrid[i][j].tileType) != 13 && ((Number(tileGrid[i][j].tileType) == Number(tileGrid[i + 1][j].tileType) && Number(tileGrid[i + 1][j].tileType) == Number(tileGrid[i + 2][j].tileType)) || (Number(tileGrid[i][j].tileType) == Number(tileGrid[i + 1][j].tileType) + 6 && Number(tileGrid[i + 1][j].tileType) == Number(tileGrid[i + 2][j].tileType)) || (Number(tileGrid[i][j].tileType) == Number(tileGrid[i + 1][j].tileType) + 6 && Number(tileGrid[i + 1][j].tileType) == Number(tileGrid[i + 2][j].tileType) - 6) || (Number(tileGrid[i][j].tileType) == Number(tileGrid[i + 1][j].tileType) && Number(tileGrid[i + 1][j].tileType) == Number(tileGrid[i + 2][j].tileType) + 6) || (Number(tileGrid[i][j].tileType) == Number(tileGrid[i + 1][j].tileType) - 6 && Number(tileGrid[i + 1][j].tileType) == Number(tileGrid[i + 2][j].tileType)) || (Number(tileGrid[i][j].tileType) == Number(tileGrid[i + 1][j].tileType) - 6 && Number(tileGrid[i + 1][j].tileType) == Number(tileGrid[i + 2][j].tileType) + 6) || (Number(tileGrid[i][j].tileType) == Number(tileGrid[i + 1][j].tileType) && Number(tileGrid[i + 1][j].tileType) == Number(tileGrid[i + 2][j].tileType) - 6))) {
							if (groups.length > 0) {
								if (groups.indexOf(tileGrid[i][j]) == -1) {
									matches.push(groups);
									groups = [];
								}
							}

							if (groups.indexOf(tileGrid[i][j]) == -1) {
								groups.push(tileGrid[i][j]);
							}
							if (groups.indexOf(tileGrid[i + 1][j]) == -1) {
								groups.push(tileGrid[i + 1][j]);
							}
							if (groups.indexOf(tileGrid[i + 2][j]) == -1) {
								groups.push(tileGrid[i + 2][j]);
							}
						}
					}
			}
			if (groups.length > 0) matches.push(groups);
		}

		return matches;

	},


	removeTileGroup: function (matches) {

		var me = this;

		//Loop through all the matches and remove the associated tiles
		for (var i = 0; i < matches.length; i++) {
			var tempArr = matches[i];
			if (tempArr.length == 4) { //bonustile part
				me.bonuscount++;
				var ax = -1;
				var ay = -1;
				var atilePos1 = me.getTilePos(me.tileGrid, me.activeTile1);
				var atilePos2 = me.getTilePos(me.tileGrid, me.activeTile2);
				console.log(atilePos1.x + " 1x " + atilePos1.y + " 1y " + atilePos2.x + " 2x " + atilePos2.y + " 2y ");
				for (var k = 0; k <= Number(tempArr.length) - 1; k++) {
					var tile3 = tempArr[k];
					var tile4 = tempArr[k + 1];
					var tilePos3 = me.getTilePos(me.tileGrid, tile3);
					var tilePos4 = me.getTilePos(me.tileGrid, tile4);
					console.log(k + " " + tilePos3.x + " kx " + tilePos3.y + " ky ");

					if (Number(tilePos3.y) == Number(tilePos4.y) && Number(tilePos3.x) == Number(atilePos1.x) && Number(tilePos3.y) == Number(atilePos1.y)) {
						ax = atilePos1.x;
						ay = atilePos1.y;
					}
					if (Number(tilePos3.y) == Number(tilePos4.y) && Number(tilePos3.x) == Number(atilePos2.x) && Number(tilePos3.y) == Number(atilePos2.y)) {
						ax = atilePos2.x;
						ay = atilePos2.y;
					}
				}
				console.log("ax");
				console.log(ax);
				console.log("ay");
				console.log(ax);

				var type = 0;
				if (tempArr[0].tileType == 1) {
					type = 7;
				}
				if (tempArr[0].tileType == 2) {
					type = 8;
				}
				if (tempArr[0].tileType == 3) {
					type = 9;
				}
				if (tempArr[0].tileType == 4) {
					type = 10;
				}
				if (tempArr[0].tileType == 5) {
					type = 11;
				}
				if (tempArr[0].tileType == 6) {
					type = 12;
				}
				if (ax != -1 && ay != -1) {
					var tile2 = me.addTile(ax, ay, type);
					me.tileGrid[ax][ay] = tile2;
				}
				if (ax == -1 && ay == -1) {
					var tile = tempArr[3];

					var tilePos = me.getTilePos(me.tileGrid, tile);
					var tile2 = me.addTile(tilePos.x, tilePos.y, type);
					me.tileGrid[tilePos.x][tilePos.y] = tile2;
					me.resetTile();
				}
			}


			if (tempArr.length == 5) { // 5 bonustile part
				var ax = -1;
				var ay = -1;
				var atilePos1 = me.getTilePos(me.tileGrid, me.activeTile1);
				var atilePos2 = me.getTilePos(me.tileGrid, me.activeTile2);
				console.log(atilePos1.x + " 1x " + atilePos1.y + " 1y " + atilePos2.x + " 2x " + atilePos2.y + " 2y ");
				for (var k = 0; k <= Number(tempArr.length) - 1; k++) {
					var tile3 = tempArr[k];
					var tile4 = tempArr[k + 1];
					var tilePos3 = me.getTilePos(me.tileGrid, tile3);
					var tilePos4 = me.getTilePos(me.tileGrid, tile4);
					console.log(k + " " + tilePos3.x + " kx " + tilePos3.y + " ky ");

					if (Number(tilePos3.y) == Number(tilePos4.y) && Number(tilePos3.x) == Number(atilePos1.x) && Number(tilePos3.y) == Number(atilePos1.y)) {
						ax = atilePos1.x;
						ay = atilePos1.y;
					}
					if (Number(tilePos3.y) == Number(tilePos4.y) && Number(tilePos3.x) == Number(atilePos2.x) && Number(tilePos3.y) == Number(atilePos2.y)) {
						ax = atilePos2.x;
						ay = atilePos2.y;
					}
				}
				console.log("ax");
				console.log(ax);
				console.log("ay");
				console.log(ax);

				var type = 0;
				if (tempArr[0].tileType == 1) {
					type = 7;
				}
				if (tempArr[0].tileType == 2) {
					type = 8;
				}
				if (tempArr[0].tileType == 3) {
					type = 9;
				}
				if (tempArr[0].tileType == 4) {
					type = 10;
				}
				if (tempArr[0].tileType == 5) {
					type = 11;
				}
				if (tempArr[0].tileType == 6) {
					type = 12;
				}
				if (ax != -1 && ay != -1) {
					var tile2 = me.addTile(ax, ay, type);
					me.tileGrid[ax][ay] = tile2;
				}
				if (ax == -1 && ay == -1) {
					var tile = tempArr[4];

					var tilePos = me.getTilePos(me.tileGrid, tile);
					var tile2 = me.addTile(tilePos.x, tilePos.y, type);
					me.tileGrid[tilePos.x][tilePos.y] = tile2;
					me.resetTile();
				}
			}

			var tile = tempArr[0];

			var tilePos = me.getTilePos(me.tileGrid, tile);
			for (var j = 0; j < tempArr.length; j++) {

				var tile = tempArr[j];
				if (Number(tile.tileType) > 6) {
					me.moves += 2;
					me.movesLabel.text = me.moves;

				}
				//Find where this tile lives in the theoretical grid
				var tilePos = me.getTilePos(me.tileGrid, tile);

				//Remove the tile from the screent
				me.tiles.remove(tile);


				//Remove the tile from the theoretical grid
				if (tilePos.x != -1 && tilePos.y != -1) {
					me.tileGrid[tilePos.x][tilePos.y] = null;
				}

			}

			//Increase the users score
			me.incrementScore(tempArr);

		}
	},

	getTilePos: function (tileGrid, tile) {
		var pos = {
			x: -1,
			y: -1
		};

		//Find the position of a specific tile in the grid
		for (var i = 0; i < tileGrid.length; i++) {
			for (var j = 0; j < tileGrid[i].length; j++) {
				//There is a match at this position so return the grid coords
				if (tile == tileGrid[i][j]) {
					pos.x = i;
					pos.y = j;
					break;
				}
			}
		}

		return pos;
	},

	resetTile: function () {

		var me = this;

		//Loop through each column starting from the left
		for (var i = 0; i < me.tileGrid.length; i++) {

			//Loop through each tile in column from bottom to top
			for (var j = me.tileGrid[i].length - 1; j > 0; j--) {

				//If this space is blank, but the one above it is not, move the one above down
				if (me.tileGrid[i][j] == null && me.tileGrid[i][j - 1] != null) {
					//Move the tile above down one
					var tempTile = me.tileGrid[i][j - 1];
					me.tileGrid[i][j] = tempTile;
					me.tileGrid[i][j - 1] = null;

					me.game.add.tween(tempTile).to({
						y: (me.tileHeight * j) + (me.tileHeight / 2)
					}, 100, Phaser.Easing.Linear.In, true);

					//The positions have changed so start this process again from the bottom
					//NOTE: This is not set to me.tileGrid[i].length - 1 because it will immediately be decremented as
					//we are at the end of the loop.
					j = me.tileGrid[i].length;
				}
			}
		}

	},

	fillTile: function (color) {

		var me = this;

		//Check for blank spaces in the grid and add new tiles at that position
		for (var i = 0; i < me.tileGrid.length; i++) {

			for (var j = 0; j < me.tileGrid[0].length; j++) {

				if (me.tileGrid[i][j] == null) {
					//Found a blank spot so lets add animate a tile there

					var tile = me.addTile(i, j, 0);

					//And also update our "theoretical" grid
					me.tileGrid[i][j] = tile;
				}

			}
		}

	},

	createScore: function () {

		var me = this;
		var scoreFont = "100px Arial";

		me.scoreLabel = me.game.add.text(950, 1780, "0", {
			font: scoreFont,
			fill: "#ff2800"
		});
		me.scoreLabel.anchor.setTo(0, 0);
		me.scoreLabel.align = 'center';
		me.scoreLabel.text = "Score:" + me.score;
	},

	createMoves: function () {

		var me = this;
		var scoreFont = "100px Arial";
		var textFont = "50px Arial";
		var tFont = "53px Arial";
		me.textLabel = me.game.add.text(10, 80, "0", {
			font: textFont,
			fill: "#ff2800"
		});
		me.textLabel.text = "Moves:";
		me.movesLabel = me.game.add.text(10, 120, "0", {
			font: scoreFont,
			fill: "#ff2800"
		});
		me.textLabel2 = me.game.add.text(10, 720, "0", {
			font: textFont,
			fill: "#ff2800"
		});
		me.textLabel2.text = "Level:";

		me.levelLabel = game.add.text(10, 760, "0", {
			font: scoreFont,
			fill: "#ff2800"
		})
		me.levelLabel.text = "17";

		me.movesLabel.anchor.setTo(0, 0);
		me.movesLabel.align = 'center';
		me.movesLabel.text = me.moves;
		me.text3Label = me.game.add.text(5, 1800, "", {
			font: tFont,
			fill: "#ff2800"
		});

		button = game.add.button(10, 1600, 'backbutton', actionOnClick2, this, 2, 1, 0);
		button.scale.setTo(0.8, 0.8);

		function actionOnClick2() {
			//title.destroy();
			this.game.state.start("GameTitle");
		}
	},

	createReplays: function () {

		var me = this;
		var scoreFont = "100px Arial";
		var textFont = "50px Arial";
		me.text2Label = me.game.add.text(10, 250, "0", {
			font: textFont,
			fill: "#ff2800"
		});
		me.text2Label.text = "Tokens:";
		me.playsLabel = me.game.add.text(10, 290, "0", {
			font: scoreFont,
			fill: "#ff2800"
		});
		me.playsLabel.anchor.setTo(0, 0);
		me.playsLabel.align = 'center';
		me.playsLabel.text = me.replays;

	},

	createSwitch: function () {

		var me = this;
		me.switch = game.add.button(10, 400, 'switch', switchOnClick, this, 2, 1, 0);
		me.switch.scale.setTo(0.32, 0.32);

		function switchOnClick() {
			me.switches = true;
			me.switch = game.add.button(10, 400, 'redswitch', switchOnClick2, this, 2, 1, 0);
			me.switch.scale.setTo(0.32, 0.32);

			function switchOnClick2() {
				me.switches = false;
				me.switch = game.add.button(10, 400, 'switch', switchOnClick, this, 2, 1, 0);
				me.switch.scale.setTo(0.32, 0.32);
			}
		}


	},

	createDelete: function () {

		var me = this;
		me.switch = game.add.button(10, 550, 'delete', switchOnClick, this, 2, 1, 0);
		me.switch.scale.setTo(0.12, 0.12);

		function switchOnClick() {
			me.delete = true;
			me.switch = game.add.button(10, 550, 'reddelete', switchOnClick2, this, 2, 1, 0);
			me.switch.scale.setTo(0.192, 0.192);

			function switchOnClick2() {
				me.delete = false;
				me.switch = game.add.button(10, 550, 'delete', switchOnClick, this, 2, 1, 0);
				me.switch.scale.setTo(0.12, 0.12);
			}
		}


	},


	incrementScore: function (tempArr) {

		var me = this;
		if (tempArr.length == 3) {
			me.score += 1;
		}
		if (tempArr.length == 4) {
			me.score += 5;
		}
		if (tempArr.length == 5) {
			me.score += 25;
		}
		me.scoreLabel.text = "Score: " + me.score;

	},

	incrementMoves: function () {
		var me = this;
		me.moves -= 1;

		me.movesLabel.text = me.moves;
	},
	incrementPlays: function () {
		var me = this;
		me.replays -= 1;

		me.playsLabel.text = me.replays;

		$.post("../ajax.php", {
			type: 'updatetokens',
			token: me.replays
		});

	},


	writeOutTokens: function () {

	},

};