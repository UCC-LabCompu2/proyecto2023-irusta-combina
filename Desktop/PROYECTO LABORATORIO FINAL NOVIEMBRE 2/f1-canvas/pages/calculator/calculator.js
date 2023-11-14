function calcularTiempoAceleracion() {
    const pesoAuto = parseFloat(document.getElementById('peso-auto').value);
    const caballosFuerza = parseFloat(document.getElementById('caballos-fuerza').value);
    const relacionPesoPotencia = parseFloat(document.getElementById('relacion-peso-potencia').value);

    // Validar que los campos no estén vacíos
    if (isNaN(pesoAuto) || isNaN(caballosFuerza) || isNaN(relacionPesoPotencia)) {
        alert("Por favor, ingresa valores válidos en todos los campos.");
        return;
    }

    // Calcular el tiempo en que el auto va de 0 a 100 km/h
    const tiempoSegundos = (pesoAuto / caballosFuerza) * relacionPesoPotencia * 1.69;

    // Mostrar el resultado"
    const resultadoElement = document.getElementById('tiempo-100kmh');
    resultadoElement.textContent = `Tiempo de Aceleración de 0 a 100 km/h: ${tiempoSegundos.toFixed(2)} segundos`;
}