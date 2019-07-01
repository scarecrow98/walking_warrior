<?php

session_start();

if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] === false) {
    header("location: index.php");
    exit;
}

require_once "config.php";

if (!empty($_POST['type']) && $_POST['type'] == 'save-level') {
    $user_id = intval($_SESSION['id']);
    $json_data = $_POST['data'];

    $stmt = mysqli_prepare($link, "INSERT INTO saves(userID, data) VALUES(?, ?)");
    mysqli_stmt_bind_param($stmt, "is", $param_user_id, $param_json_data);
    $param_user_id = $user_id;
    $param_json_data = $json_data;

    if (mysqli_stmt_execute($stmt)) {
        echo 'level saved:' . $json_data;
    } else {
        echo 'error saving level';
    }

}

if (!empty($_POST['type']) && $_POST['type'] == 'get-level') {
    $user_id = intval($_SESSION['id']);

    $stmt = mysqli_query($link, "SELECT * FROM saves WHERE userID = $user_id ORDER BY date DESC LIMIT 1");
    $result = mysqli_fetch_array($stmt);

    echo $result['data'];
}