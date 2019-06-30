<?php
require_once "config.php";
require_once "functions.php"; 

$username = $old_password = $new_password_1 = $new_password_2 = '';
$username_err = $password_err = $new_password_err = '';

if (!empty($_POST['username']) && !empty($_POST['old-password']) && !empty($_POST['new-password-1']) && !empty($_POST['new-password-2'])) {
    $username = $_POST['username'];
    $old_password = $_POST['old-password'];
    $new_password_1 = $_POST['new-password-1'];
    $new_password_2 = $_POST['new-password-2'];

    if ($new_password_1 != $new_password_2) {
        $new_password_err = "Passwords do not match!";
    }

    if (strlen($new_password_1) < 6) {
        $new_password_err = "Password must have atleast 6 characters.";
    }

    $verify = verify_user($username, $old_password);
    switch($verify['msg']) {
        case 'invalid-password':
            $password_err = 'The old password is not correct!';
        break;
        case 'invalid-username':
            $username_err = 'The given user cannot be found!';
        break;
        case 'con-error':
            exit('Oops! Something went wrong. Please try again later.');
        break;
    }

    if (empty($password_err) && empty($new_password_err) && empty($username_err) && $verify['result'] == true) {
        //given inputs are correct, change the password
        $stmt = mysqli_prepare($link, "UPDATE users SET password = ? WHERE username = ?");
        mysqli_stmt_bind_param($stmt, "ss", $param_password, $param_username);

        $param_username = $username;
        $param_password = password_hash($new_password_1, PASSWORD_DEFAULT);

        if(mysqli_stmt_execute($stmt)){
            header("location: login.php");
        } else{
            echo "Something went wrong. Please try again later.";
        }
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Password Recover - Walking Warrior</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
    <style type="text/css">
        body{ font: 14px sans-serif; }
        .wrapper{ width: 350px; padding: 20px; }
    </style>
</head>
<body>
    <div class="wrapper">
        <h2>Login to Walking Warrior!</h2>
        <p>Enter your username, your old and new password.</p>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="POST">
        <div class="form-group <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
                <label>Username</label>
                <input type="text" name="username" class="form-control" value="<?php echo $username; ?>">
                <span class="help-block"><?php echo $username_err; ?></span>
            </div>    
            <div class="form-group <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
                <label>Old password</label> 
                <input type="password" name="old-password" class="form-control">
                <span class="help-block"><?php echo $password_err; ?></span>
            </div> 
            <div class="form-group <?php echo (!empty($new_password_err)) ? 'has-error' : ''; ?>">
                <label>New password</label>
                <input type="password" name="new-password-1" class="form-control">
                <span class="help-block"><?php echo $new_password_err; ?></span>
            </div>
            <div class="form-group">
                <label>New password again</label>
                <input type="password" name="new-password-2" class="form-control">
            </div> 
            <div class="form-group">
                <input type="submit" class="btn btn-primary" value="Change my password">
            </div>
            <p>Already have an account? <a href="login.php">Login here</a>.</p>
        </form>
    </div>
 <footer>
  <p>This webpage uses cookies. Please allow cookies in your browser.</p>
</footer>     
</body>
</html>