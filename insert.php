<?php

include_once "connection.php";


$i = 0;
$arrayDatos = [];

foreach ($_POST as $key => $val){
    // $arrayDatos[$i][$key] = $val;
    $arrayDatos[$i] = $val;
    $i++;
}

// $arrayDatos = ["hola","hola","2023-07-07","fede","Alta"];




$insert = "INSERT INTO apptareas (token, titulo, descripcion, fecha, colaboradores, prioridad) VALUES (?, ?, ?, ?, ?, ?)";
$sql_insert = $conn->prepare($insert);
$sql_insert->execute($arrayDatos);



$select = "SELECT * FROM apptareas";
$sql_select = $conn->prepare($select);
$sql_select->execute();

$resultado = $sql_select->fetchAll();
print_r($resultado);
echo json_encode($resultado);

echo "Insert Ok";