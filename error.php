<?php

if (!empty($_POST['type']) && $_POST['type'] == 'errorlog' && !empty($_POST['error'])) {
    $error =$_POST['error'];
    $file = fopen('js_error.log', 'a');

    fwrite($file, date('Y.m.d H:i:s') . ' ' . $error);
    fwrite($file, PHP_EOL);
    fclose($file);
}