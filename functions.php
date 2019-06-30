<?php
require_once "config.php";


function verify_user($username, $password) {
    global $link;
    $sql = "SELECT id, username, password FROM users WHERE username = ?";

    if($stmt = mysqli_prepare($link, $sql)){
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
                        return ['result' => true, 'msg' => null];
                    } else{
                        return ['result' => false, 'msg' => 'invalid-password'];
                    }
                }
            } else{
                // Display an error message if username doesn't exist
                return ['result' => false, 'msg' => 'invalid-username'];
            }
        } else{
           return ['result' => false, 'msg' => 'con-error'];
        }
    }
}
