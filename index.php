<?php
// Initialize the session
session_start();

require_once "config.php";
 
// Check if the user is logged in, if not then redirect him to login page
if(isset($_SESSION["id"]) && $_SESSION['id'] !== "") {
    $sessionid = $_SESSION['id'];

    $issetuser = mysqli_query($link, "SELECT `id` FROM `users` WHERE `id` = $sessionid");
    if(mysqli_num_rows($issetuser) == 0) { //valós felhasználó
        header("location: login.php");
        exit;
    }
} else {
    header("location: login.php");
    exit;
}
?>

<!doctype html> 
<html lang="en"> 
<head> 
	<meta charset="UTF-8" />
	<title>Walking Warrior</title>
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/phaser.min.js"></script>
	<script type="text/javascript" src="js/boot.js"></script>
	<script type="text/javascript" src="js/steps.js"></script>
	<script type="text/javascript" src="js/preload.js"></script>
	<script type="text/javascript" src="js/gametitle.js"></script>
	<script type="text/javascript" src="js/main.js"></script>
	<script type="text/javascript" src="js/gameover.js"></script>
        <script type="text/javascript" src="js/info.js"></script>
        <script type="text/javascript" src="js/description.js"></script>
        <script type="text/javascript" src="js/nextlevel.js"></script>
        <script type="text/javascript" src="js/level2.js"></script>
        <script type="text/javascript" src="js/level1.js"></script>
        <script type="text/javascript" src="js/level3.js"></script>
        <script type="text/javascript" src="js/level4.js"></script>
        <script type="text/javascript" src="js/level5.js"></script>
        <script type="text/javascript" src="js/level6.js"></script>
        <script type="text/javascript" src="js/level7.js"></script>
        <script type="text/javascript" src="js/level8.js"></script>
        <script type="text/javascript" src="js/level9.js"></script>
        <script type="text/javascript" src="js/level10.js"></script>
        <script type="text/javascript" src="js/level11.js"></script>
        <script type="text/javascript" src="js/level12.js"></script>
        <script type="text/javascript" src="js/level13.js"></script>
        <script type="text/javascript" src="js/level14.js"></script>
        <script type="text/javascript" src="js/level15.js"></script>
        <script type="text/javascript" src="js/level16.js"></script>
        <script type="text/javascript" src="js/level17.js"></script>
        <script type="text/javascript" src="js/level18.js"></script>
        <script type="text/javascript" src="js/level19.js"></script>
        <script type="text/javascript" src="js/level20.js"></script>
        <script type="text/javascript" src="js/level21.js"></script>
        <script type="text/javascript" src="js/level22.js"></script>
        <script type="text/javascript" src="js/level23.js"></script>
        <script type="text/javascript" src="js/nextlevelstep.js"></script>
        <script type="text/javascript" src="js/counter.js"></script>
        
    <style type="text/css">
        body {
            margin: 0;
        }
    </style>
    <script type="text/javascript">
		(function() {

				//Create a new game that fills the screen
				game = new Phaser.Game(1400, 1920, Phaser.CANVAS);
				//game = new Phaser.Game((window.innerWidth * window.devicePixelRatio), (window.innerHeight * window.devicePixelRatio), Phaser.CANVAS);
				//Add all states
				game.state.add("Boot", Boot);
				game.state.add("Preload", Preload);
				game.state.add("GameTitle", GameTitle);
				game.state.add("Main", Main);
				game.state.add("GameOver", GameOver);
                                game.state.add("Info", Info);
                                game.state.add("Description", Description);
                                game.state.add("NextLevel", NextLevel);
                                game.state.add("Level1", Level1);
                                game.state.add("Level2", Level2);
                                game.state.add("Level3", Level3);
                                game.state.add("Level4", Level4);
                                game.state.add("Level5", Level5);
                                game.state.add("Level6", Level6);
                                game.state.add("Level7", Level7);
                                game.state.add("Level8", Level8);
                                game.state.add("Level9", Level9);
                                game.state.add("Level10", Level10);
                                game.state.add("Level11", Level11);
                                game.state.add("Level12", Level12);
                                game.state.add("Level13", Level13);
                                game.state.add("Level14", Level14);
                                game.state.add("Level15", Level15);
                                game.state.add("Level16", Level16);
                                game.state.add("Level17", Level17);
                                game.state.add("Level18", Level18);
                                game.state.add("Level19", Level19);
                                game.state.add("Level20", Level20);
                                game.state.add("Level21", Level21);
                                game.state.add("Level22", Level22);
                                game.state.add("Level23", Level23);
                                game.state.add("NextLevelStep", NextLevelStep);
                                game.state.add("Counter", Counter);
				//Start the first state
				game.state.start("Boot");

		})();
    </script>
</head>
<body>
</body>
</html>