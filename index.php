<?php
include_once "connection.php";


$select = "SELECT * FROM apptareas";
$sql_select = $conn->prepare($select);
$sql_select->execute();

$resultado = $sql_select->fetchAll();

// print_r($resultado);
//echo json_encode($resultado);

?>




<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>To do app</title>
  <link rel="stylesheet" href="css/style.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/bevacqua/dragula@3.7.3/dist/dragula.min.css">
  <script src="https://cdn.jsdelivr.net/gh/bevacqua/dragula@3.7.3/dist/dragula.min.js"></script>

</head>

<body onload="init()">
  <header>
    <form id="formulario">
      <div id="div-form">
        <label for="tarea"></label>
        <input class="tarea-width" type="text" name="tarea" id="tarea" placeholder="Título" />

        <label for="descripcion"></label>
        <input class="tarea-width" type="text" name="descripcion" id="descripcion" placeholder="Descripcion" />


        <div id="iconos">
          <div class="iconos-inside">
            <label for="fecha"></label>

            <input class="tarea-width" class="input-fecha" type="date" name="fecha" id="fecha" />
          </div>
          <div class="iconos-inside2">
            <img id="colaboraFoto" src="img/colaboradores.png" alt="colaborar" onclick="mostrarDivColaboradores()">
            <div>
              <label for="colaborador"></label>
              <select name="colaborador" id="colaborador" multiple>
                <option value="Nico">Nico</option>
                <option value="Sara">Sara</option>
                <option value="Fede">Fede</option>
              </select>

            </div>

          </div>
          <div class="iconos-inside3">
            <img id="prioridadFoto" src="
              img/prioridad.png" alt="colaborar" onclick="mostrarDivPrioridad()">
            <div>
              <label for="prioridades"></label>
              <select name="prioridades" id="prioridad">
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
              </select>
            </div>

          </div>
          <div id="enviar-boton">
            <div class="iconos-inside">
              <input type="submit" value="Agregar Tarea" id="submitBtn">

            </div>
          </div>

        </div>

    </form>
  </header>

  <main>

    <div class="container">
      <div class="tareas" id="pendiente">
        <h2 ondrag="dragStart(e)">Tareas pendientes</h2>
        <!-- Traeremos los datos de la base de datos mediante PHP -->
        <?php mostrarTareas("pendiente", $resultado); ?>

        <div id="titulo">

        </div>
      </div>
      <div class="tareas" id="ejecucion">
        <h2 ondragstart="dragStart(e)">Tareas en ejecución</h2>
        <!-- Traeremos los datos de la base de datos mediante PHP -->

        <?php mostrarTareas("ejecucion", $resultado); ?>

        <div id="titulo2">


        </div>
      </div>
      <div class="tareas" id="finalizada">
        <h2 ondragstart="dragStart(e)">Tareas finalizadas</h2>
        <!-- Traeremos los datos de la base de datos mediante PHP -->

        <?php mostrarTareas("finalizada", $resultado); ?>

        <div id="titulo3">

        </div>
      </div>
    </div>
  </main>

  <footer></footer>
  <script src="js/jquery-3.7.0.min.js"></script>
  <script src="js/script2.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
</body>

</html>


<?php

//FUNCIÓN QUE IMITA A LA DE mostrarDiv() DE JAVASCRIPT QUE NOS TRAERÁ LOS DATOS DE LA BASE DE DATOS Y LOS INSERTARÁ EN FORMA DE TARJETA

function mostrarTareas($tipo, $arrayTareas)
{
  $salida = "";
  foreach ($arrayTareas as $fila) {
    if ($fila['tipo'] == "$tipo") {

      $salida .= '<div class="dragthing" draggable="true" tipo="' . $tipo . '" token="' . $fila['token'] . '">';
      $salida .= '<div class="divTextoBotones">';
      $salida .= '<div class="divTexto">';
      $salida .= "<h3 class='h3-titulo'>" . $fila['titulo'] . "</h3>";
      $salida .= "<p class='p-descripcion'>" . $fila['descripcion'] . "</p>";
      $salida .= "</div>";
      $salida .= "<div class='divBotones'>";
      $salida .= "<button onclick=\"eliminarTarea('" . $fila['token'] . "')\">X</button>";
      $salida .= "<button  onclick=\"editarTarea('" . $fila['token'] . "')\">Editar</button><button disabled class='b-save' onclick=\"guardarCambios('" . $fila['token'] . "')\" >Guardar</button></div>";

      $salida .= "</div>";
      $salida .= '<div id="divFooter"><p   id="date"><span>Fecha límite: </span> <span class="p-fecha">"' . $fila['fecha'] . '"</span></p>';
      $salida .= '<p id="importancia"   style="color: red;"><span style="color:black;">Prioridad:</span><span class="p-prioridad">"' . $fila['prioridad'] . '"</span></p>';
      $salida .= '<p id="participantes"><span>Participantes: </span><span class="p-colaboradores">"' . $fila['colaboradores'] . '"</span></p></div>';
      $salida .= "</div>";
    }
  }
  echo $salida;
}



?>