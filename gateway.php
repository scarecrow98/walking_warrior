<?php

require_once 'config.php';

ini_set('display_errors', 1);

function authenticate_user($db, $username, $password) {
    $sql = "SELECT id, username, password FROM users WHERE username = ?";
        
    if($stmt = mysqli_prepare($db, $sql)){
        // Bind variables to the prepared statement as parameters
        mysqli_stmt_bind_param($stmt, "s", $param_username);
        
        // Set parameters
        $param_username = $username;
        
        // Attempt to execute the prepared statement
        if(mysqli_stmt_execute($stmt)){
            // Store result
            mysqli_stmt_store_result($stmt);
            
            // Check if username exists, if yes then verify password
            if(mysqli_stmt_num_rows($stmt) == 1){                    
                // Bind result variables
                mysqli_stmt_bind_result($stmt, $id, $username, $hashed_password);
                if(mysqli_stmt_fetch($stmt)){
                    if(password_verify($password, $hashed_password)){
                        return true;
                    } else{
                        // Display an error message if password is not valid
                        return false;
                    }
                }
            } else{
                // Display an error message if username doesn't exist
                return false;
            }
        } else{
            return false;
        }
    }
}

if (!empty($_REQUEST['android-login'])) {
    $username = empty($_REQUEST['username']) ? '' : $_REQUEST['username'];
    $password = empty($_REQUEST['password']) ? '' : $_REQUEST['password'];

    echo authenticate_user($link, $username, $password) ? 'true' : 'false';
}

if (!empty($_REQUEST['update-steps'])) {
    $username = empty($_REQUEST['username']) ? '' : $_REQUEST['username'];
    $password = empty($_REQUEST['password']) ? '' : $_REQUEST['password'];
    $steps = empty($_REQUEST['steps']) ? 0 : $_REQUEST['steps'];
    $steps = intval($steps);

    if (authenticate_user($link, $username, $password)) {
        $tokens = intval($steps / 20);
        mysqli_query($link,
        "UPDATE users SET tokens = tokens + $tokens,
        steps = steps + $steps
        WHERE username = '$username'");

        echo 'tokens: ' . $tokens;
    } else {
        echo 'Authentication error.';
    }
}
?>