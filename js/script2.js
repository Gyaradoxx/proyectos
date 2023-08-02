

const arrayPendientes = [];
document.getElementById("colaborador").style.display = "none";

document.getElementById("prioridad").style.display = "none";
// Añadimos un AddEventListener al botón agregar tarea que nos creará un objeto con los valores que introduzcamos en el formulario
document.getElementById("submitBtn").addEventListener("click", (e) => {
  // Salimos de la función de la función si los campos del formulario estan vacios
  if (
    document.getElementById("tarea").value === "" ||
    document.getElementById("descripcion").value === "" ||
    document.getElementById("fecha").value === "" ||
    conseguirValores("colaborador").length === 0 ||
    document.getElementById("prioridad").value === ""
  ) {
    e.preventDefault();
    return;
  }

  e.preventDefault();

  // function enviarTarea() {
  // Creamos un objeto con la data del formulario
  const nuevaTarea = new Object();
  const token = getRandomId();
  nuevaTarea.token = token;
  nuevaTarea.titulo = document.getElementById("tarea").value;
  nuevaTarea.descripcion = document.getElementById("descripcion").value;
  nuevaTarea.fecha = document.getElementById("fecha").value;
  nuevaTarea.colaboradores = conseguirValores("colaborador");
  nuevaTarea.prioridad = document.getElementById("prioridad").value;

  // añadimos el objeto nuevaTarea al arrayPendientes
  arrayPendientes.push(nuevaTarea);

  // mostramos los valores del formulario en el div "pendientes"
  mostrarDiv(nuevaTarea);


  // console.log("nueva tarea", nuevaTarea);
  //funcion ajax para conectarnos con la base de datos
  $.ajax({
    data: nuevaTarea,
    url: "insert.php",
    type: "POST",

    success: (respuesta) => {
      console.log("insert ok");
    },
    error: (error) => {
      console.log(error);
    },
  });

  // document.getElementById("tarea").value = "";
  // document.getElementById("descripcion").value = "";
  // document.getElementById("fecha").value = "";
  // document.getElementById("colaborador").value = "";
  // document.getElementById("prioridad").value = "";
});

// }

//Función para mostrar la salida en pantalla en base al objeto creado previamente que se ejecutará al clickar el botón Agregar Tarea 
function mostrarDiv(nuevaTarea) {

  // Según la prioridad el color variará
  let colorPrioridad 
  if (nuevaTarea.prioridad === "Baja") {
    colorPrioridad = "blue";
  } else if (nuevaTarea.prioridad === "Media") {
    colorPrioridad = "#b6800d";
  } else {
    colorPrioridad = "red";
  }
  let salida = `<div class="dragthing ex-moved" draggable="true" tipo="pendiente" token="${nuevaTarea.token}">`;
  salida += `<div class="divTextoBotones">`;
  salida += ` <div class="divTexto">`;
  salida += ` <h3 class="h3-titulo">${nuevaTarea.titulo}</h3>`;
  salida += ` <p class="p-descripcion">${nuevaTarea.descripcion}</p>`;
  salida += ` </div>`;
  salida += `<div class="divBotones">`;
  salida += ` <button onclick="eliminarTarea('${nuevaTarea.token}')">X</button>`;
  salida += ` <button onclick="editarTarea('${nuevaTarea.token}')">Editar</button>`;
  salida += ` <button class="b-save" onclick="guardarCambios('${nuevaTarea.token}')">Guardar</button>`;
  salida += `  </div>`;
  salida += ` </div>`;
  salida += ` <div id="divFooter">`;
  salida += ` <p id="date"><span>Fecha límite: </span> <span class="p-fecha">"${nuevaTarea.fecha}"</span></p>`;
  salida += `<p id="importancia" style="color: red;"><span style="color:black;">Prioridad:</span><span class="p-prioridad" style ="color: ${colorPrioridad} ">${nuevaTarea.prioridad}</span></p>`;
  salida += ` <p id="participantes"><span>Participantes: </span><span class="p-colaboradores">${nuevaTarea.colaboradores}</span></p>`;
  salida += ` </div>`;
  salida += ` </div>`;

  //Mostramos salida en el div "pendiente"
  document.getElementById("pendiente").innerHTML += salida
}

//Función con la librería "Dragula" que nos permiterá usar el drag and drop y poder mover nuestras tareas según convenga
function init() {
  dragula([
    document.getElementById("pendiente"),
    document.getElementById("ejecucion"),
    document.getElementById("finalizada"),
  ])
    .on("drag", function (el) {
      el.className = el.className.replace("ex-moved", "");
    })

    // Actualizaremos la base de datos mediante $.AJAX al dropear la tarjeta donde queramos, así podremos cambiar el estado de la tarea 
    .on("drop", function (el) {
      let tipoTarea = el.parentNode.getAttribute("id");
      let token = el.getAttribute("token");
      $.ajax({
        data: { tipoTarea: tipoTarea, token: token },
        url: "cambio-tarea.php",
        type: "POST",

        success: (respuesta) => {
          // console.log(respuesta);
        },
        error: (error) => {
          console.log(error);
        },
      });

      el.className += " ex-moved";
    })
    .on("over", function (container) {
      container.className += " ex-over";
    })
    .on("out", function (container) {
      container.className = container.className.replace("ex-over", "");
    });
}

// Función para recoger el valor del multiselect, que pasaremos a un srtring con el método .ToString()

function conseguirValores() {
  let selectElement = document.getElementById("colaborador");
  let selectedValues = [];

  for (let i = 0; i < selectElement.options.length; i++) {
    let option = selectElement.options[i];

    if (option.selected) {
      selectedValues.push(option.value);
    }
  }
  return selectedValues.toString();
}

// Función que mostrará el div al clickar en el icono correspondiente
function mostrarDivColaboradores() {
  document.getElementById("colaborador").style.display = "block";
}
// Función que mostrará el div al clickar en el icono correspondiente

function mostrarDivPrioridad() {
  document.getElementById("prioridad").style.display = "block";
}

function dragStart(e) {
  e.preventDefault();
}
// Función que generará un ID o TOKEN aleatorio para poder identificar nuestras divs
function getRandomId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
// funcion para elminar la tarea deseada con un parámetro (token) que será el identificador del div que queramos eliminar
function eliminarTarea(token) {
  console.log("Voy a borrar el token", token);
  $.ajax({
    data: { token },
    url: "delete.php",
    type: "POST",

    success: (respuesta) => {
      console.log("Tarea borrada");
    },
    error: (error) => {
      console.log(error);
    },
  });

  console.log(document.querySelector(`[token=${token}]`));
  document.querySelector(`[token=${token}]`).remove();
}
// Funcion para poder editar de momento solo el titulo y la descripción de la tarea
function editarTarea(token) {
  console.log("hola");

  // console.log(document.querySelector(`[token=${token}] h3`));
  //console.log(document.querySelector(`[token=${token}] h3`).innerHTML)
  document
    .querySelector(`[token= ${token}]  .h3-titulo`)
    .setAttribute("contentEditable", true);
  document
    .querySelector(`[token= ${token}] .p-descripcion`)
    .setAttribute("contentEditable", true);
  document
    .querySelector(`[token= ${token}] .b-save`)
    .removeAttribute("disabled");

  // localStorage.clear()
  // localStorage.setItem("titulo", document.querySelector(`[token=${token}] h3`).textContent)

  // $.ajax({
  //   data: { token },
  //   url: "update.php",
  //   type: "POST",

  //   success: (respuesta) => {},
  //   error: (error) => {
  //     console.log(error);
  //   },
  // });
}
// Función que nos actualizará los datos en la base de datos mediante Ajax (Faltaría poder editar fecha/colaboradores/importancia)
function guardarCambios(token) {
  let objetoGuardar = new Object();
  // Guardar los cambios realizados
  objetoGuardar.titulo = document.querySelector(
    `[token= ${token}] h3`
  ).textContent;
  objetoGuardar.descripcion = document.querySelector(
    `[token= ${token}] .p-descripcion`
  ).textContent;
  objetoGuardar.fecha = document.querySelector(
    `[token= ${token}] .p-fecha`
  ).textContent;
  objetoGuardar.colaboradores = document.querySelector(
    `[token= ${token}] .p-colaboradores`
  ).textContent;
  objetoGuardar.prioridad = document.querySelector(
    `[token= ${token}] .p-prioridad`
  ).textContent;

  objetoGuardar.token = token;
  console.log(objetoGuardar);
  $.ajax({
    data: objetoGuardar,

    url: "update.php",
    type: "POST",

    success: (respuesta) => {
      console.log(respuesta);
    },
    error: (error) => {
      console.log(error);
    },
  });
}
