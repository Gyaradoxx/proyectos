<!-- ARCHIVO PHP PARA PODER HACER EL CAMBIO DE TAREA  -->


<?php
// Acceder a la conexión con la base de datos
include_once "connection.php";
// print_r($_POST);

$i = 0;
$arrayDatos = [];
foreach ($_POST as $clave => $valor) {
    $arrayDatos[$i] = $valor;
    $i++;
}

$update = "UPDATE apptareas SET tipo = ? WHERE token = ?";
$sql_update = $conn->prepare($update);
$sql_update->execute($arrayDatos);

$conn = null;
$sql_update = null;
//echo "update ok";

header("location:index.php");