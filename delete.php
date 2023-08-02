
<?php
// echo "Enviaste el ID ". $_GET['id'];

include_once "connection.php";


$delete = "DELETE FROM `apptareas` WHERE token = ? ";

$sql_delete = $conn -> prepare($delete);

$sql_delete -> execute(array($_POST['token']));



$conn = null;

$sql_delete = null;

echo "Borrado ok";

header("location:index.php");
