<?
session_start();

if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] === false){
  header("location: index.php");
  exit;
}

require_once "config.php";

$type = $_POST['type'];
$id   = $_SESSION['id'];
$token= $_POST['token'];
$step = $_POST['step'];
$score = $_POST['score'];
$gamelevel = $_POST['gamelevel'];

if (isset($type) && $type != "") {
  switch ($type) {
    case 'gettokens':
      $sql = mysqli_query($link, "SELECT `tokens` FROM `users` WHERE `id` = '$id'");

      if(mysqli_num_rows($sql) == 1) {
        $row = mysqli_fetch_array($sql);
        $response = array('tokens' => $row['tokens']);
        echo json_encode($response);
      }
    break;

    case 'minustokens':
      $sql = mysqli_query($link, "UPDATE `users` SET tokens = GREATEST(0, tokens - 1) WHERE `id` = '$id'");
    break;

    case 'updatetokens':
      $sql = mysqli_query($link, "UPDATE `users` SET `tokens` = '$token' WHERE `id` = '$id'"); //eredeti: '$token'
    break;

    case 'updatesteps':
      $sql = mysqli_query($link, "UPDATE `users` SET steps = steps + $step, tokens = tokens + 1 WHERE id = '$id'");
    break;

    case 'updatescore':
      $sql = mysqli_query($link, "UPDATE `users` SET score = score + $score WHERE id = '$id'");
    break;

    case 'highestlevel':
      $sql = mysqli_query($link, "UPDATE `users` SET gamelevel = $gamelevel WHERE id = '$id' AND gamelevel < $gamelevel");
    break;

    default:
    break;
  }
}
?>