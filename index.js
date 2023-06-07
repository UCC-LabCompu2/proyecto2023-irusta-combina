/**
 * Ejecuta la funcion
 */
document.querySelector(".search-box").addEventListener("click", mostrarListaDesplegable);
document.getElementById("main-container").addEventListener("click", ocultarBuscador);


/**
 * Nombramos variables
 */
var listaDesplegable = document.getElementById("box-search-bars");
var inputSearch = document.getElementById("inputSearch");
var ocultar_barra = document.getElementById("main-container");

/**
 * Muestra la lista en la pagina principal
 */
function mostrarListaDesplegable() {
  listaDesplegable.classList.add("visible");
  inputSearch.focus();
}

/** Verificar si se hizo clic dentro o fuera del buscador
 *
 */
function ocultarBuscador(event) {
  if (!listaDesplegable.contains(event.target)) {
    listaDesplegable.classList.remove("visible");
  }
}

/**
 * Filtro de busqueda
 */

document.getElementById("inputSearch").addEventListener("keyup", buscadorInterno);

/**
 * Recorre los elementos filtrados
 */
function buscadorInterno() {
  var filter = inputSearch.value.toUpperCase();
  var li = listaDesplegable.getElementsByTagName("li");
  var encontrado = false; // Variable para verificar si se encuentra algún valor

  for (var i = 0; i < li.length; i++) {
    var a = li[i].getElementsByTagName("a")[0];
    var textValue = a.textContent || a.innerText;

    if (textValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
      encontrado = true; // Se encontró al menos un valor
    } else {
      li[i].style.display = "none";
    }
  }

  if (!encontrado) {
    alert("No se encontró ningún valor de ese tipo");
  }
}