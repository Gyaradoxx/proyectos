<?php

$link = 'mysql:host=localhost;port=3306;dbname=apptareas;charset=utf8mb4';

$user = 'root';

$pass = "";

try {

    $conn = new PDO($link, $user, $pass);

    // echo "Conexión realizada!";
} catch (PDOException $e) {

    print "Error!" . $e->getMessage();
    die();
}
