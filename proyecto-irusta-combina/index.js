const opcionesMenuDesplegable = [
  {
    nombre: "Calculadora de potencia",
    url: "pages/calculator/calculator.html",
  },
  {
    nombre: "Aston Martin",
    url: "pages/pages-escuadras/aston-martin.html",
  },
  {
    nombre: "Ferrari",
    url: "pages/pages-escuadras/ferrari.html",
  },
  {
    nombre: "Mercedes",
    url: "pages/pages-escuadras/mercedes.html",
  },
];

// Seleccionamos el elemento que contiene la lista desplegable
const listaDesplegable = document.getElementById("box-search-bars");

/*
  @method {funcion anonima autoejecutable}
  @description Esta funcion se encarga de cargar la lista desplegable
  @return {void}
*/
(() => {
  listaDesplegable.classList.add("visible");
  listaDesplegable.innerHTML += opcionesMenuDesplegable
    .map(
      (opcion) =>
        `
        <li class="list-item">
          <a href="${opcion.url}">
            <i class="fa-solid fa-magnifying-glass"></i>
            ${opcion.nombre}
          </a>
        </li>
      `
    )
    .join("");
})();

/**
 * @method buscadorInterno
 * @params { e } evento del formulario
 * @return { void } No retorna nada
 * @description Esta funcion se encarga de buscar en la lista desplegable
 */
function buscadorInterno(e) {
  e.preventDefault();

  // Se obtiene el elemento HTML input con el id inputSearch
  const inputSearch = document.getElementById("inputSearch");

  // Se busca dentro del array de objetos si existe el nombre ingresado si no existe se retorna undefined
  const opcion = opcionesMenuDesplegable.find((opc) =>
    opc.nombre.toLowerCase() == inputSearch.value.toLowerCase()
      ? opc
      : undefined
  );

  // Si no se encuentra el nombre ingresado se muestra un mensaje de error y se limpia el input
  if (opcion == undefined) {
    alert(`No se encontraron resultados para: "${inputSearch.value}"`);
    inputSearch.value = "";
    return;
  }

  // Se recorre el array de objetos y se compara si el nombre ingresado es igual al nombre del objeto si es asi se redirecciona a la url asociada al objeto
  opcionesMenuDesplegable.forEach((opc) => {
    if (opc.nombre === opcion.nombre) {
      window.location.href = opc.url;
    }
  });
  inputSearch.value = "";
}
