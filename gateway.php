<?php

require_once 'config.php';

ini_set('display_errors', 1);

define('TEST_MODE', true);

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
                        return false;
                    }
                }
            } else{
                return false;
            }
        } else{
            return false;
        }
    }
}

//androidos bejelentkezés true vagy false-t küld vissza
if (!empty($_REQUEST['android-login'])) {
    $username = empty($_REQUEST['username']) ? '' : $_REQUEST['username'];
    $password = empty($_REQUEST['password']) ? '' : $_REQUEST['password'];

    echo authenticate_user($link, $username, $password) ? 'true' : 'false';
}

//lépések mentése, token adása
if (!empty($_REQUEST['update-steps'])) {
    
    $username = empty($_REQUEST['username']) ? '' : $_REQUEST['username'];
    $password = empty($_REQUEST['password']) ? '' : $_REQUEST['password'];
    $steps = empty($_REQUEST['steps']) ? 0 : $_REQUEST['steps'];
    $steps = intval($steps);
    $steps_for_one_token = 20;


    if (authenticate_user($link, $username, $password)) {
        $stmt = mysqli_query($link, "SELECT * FROM users WHERE username = '$username'");
        $user = mysqli_fetch_assoc($stmt);
        $steps_left_to_token = $user['steps'] - $user['checkpoint_steps'];

        if (TEST_MODE) {
            $tokens = intval($steps / 20);
            mysqli_query($link, "UPDATE users SET tokens = tokens + $tokens,
                                steps = steps + $steps
                                WHERE username = '$username'");
            echo "You have received $tokens tokens for $steps steps. (TEST MODE)";
            exit();
        }

        //ha van tokenje, akkor nem adunk neki ujat a lépésekért, de a lépései eltároljuk
        if ($user['tokens'] > 0) {
            mysqli_query($link, "UPDATE users SET steps = steps + $steps WHERE username = '$username'");
            echo "Your steps are saved. You didn't receive a token because you already have one.";
            exit();
        }

        //ha nincs tokenje, de a lépései elegek egy tokenhez, akkor megadjuk neki
        if ($user['tokens'] == 0 && $steps_left_to_token + $steps >= $steps_for_one_token) {
            echo "You have received a token.";
            mysqli_query($link, "UPDATE users SET tokens = 1,  checkpoint_steps = steps + $steps, steps = steps + $steps WHERE username = '$username'");
            exit();
        }

        //ha nincs tokenje, de a lépései még nem elegek az új tokenhez, akkor csak mentjük a lépéseket
        if ($user['tokens'] == 0 && $steps_left_to_token + $steps < $steps_for_one_token) {
            echo "Your steps are saved but you need to walk another " . ($steps_for_one_token - ($steps + $steps_left_to_token) . " steps to receive a token.");
            mysqli_query($link, "UPDATE users SET steps = steps + $steps WHERE username = '$username'");
            exit();
        }
    } else {
        echo 'Authentication error.';
    }
}
?>