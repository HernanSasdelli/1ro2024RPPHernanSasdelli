/*VARIABLE GLOBAL PARA MANTENER EL ID */
let ultimoID = 0;
/*ARRAY DE VEHICULOS*/
let vehiculos = formatearDatos(datosPrecargados);


/*FORMATEA LOS DATOS A LOS CONSTRUCTORES*/
function formatearDatos(datos) {
    let vehiculos = [];

    datos.forEach(function(vehiculo) {
        if (vehiculo.cantidadPuertas !== undefined) {
            vehiculos.push(new Auto(vehiculo.id, vehiculo.modelo, vehiculo.anoFabricacion, vehiculo.velMax, vehiculo.cantidadPuertas, vehiculo.asientos));
        }
        if (vehiculo.carga !== undefined) {
            vehiculos.push(new Camion(vehiculo.id, vehiculo.modelo, vehiculo.anoFabricacion, vehiculo.velMax, vehiculo.carga, vehiculo.autonomia));
        }
    });

    return vehiculos;
}



/*----------TABLA---------*/

/*MUESTRA AL COMIENZO DE LA APP LOS DATOS PRECARGADOS*/
mostrarEnTabla(vehiculos);


/*--------------ABM------------*/


/*ESCUCHA DEL BOTON TIPO DE VEHICULO DEL ABM*/
document.getElementById("tipoVehiculo").addEventListener("change", mostrarCampos);

/*ESCUCHA DEL FILTRO DE TIPO DE VEHICULOS*/
document.querySelector("#filtroTipo").addEventListener("change", filtrarVehiculos);

/*ESCUCHA AL BOTON CALCULAR DE LA TABLA*/
document.getElementById("botonCalcular").addEventListener("click", calcularVelMaxPromedio);


/*BOTON CANCELAR DEL ABM*/
document.querySelector(".cancelar").addEventListener("click", function() {
    if (confirm("¿Está seguro de que desea cancelar?")) {
        resetearFormularioABM()
    }
});


/*BOTON AGREGAR DEL ABM*/
document.querySelector('.agregarVehiculo').addEventListener('click', function() {
    let modelo = document.getElementById("vehiculo-modelo").value.trim();
    let anoFabricacion = parseInt(document.getElementById("vehiculo-anoFabricacion").value.trim());
    let velMax = parseInt(document.getElementById("vehiculo-velMax").value.trim());
    let tipoVehiculo = document.getElementById("tipoVehiculo").value;
    let otrosDatos = {};

    if (tipoVehiculo === "auto") {
        let cantidadPuertas = parseInt(document.getElementById("auto-cantidadPuertas").value.trim());
        let asientos = parseInt(document.getElementById("auto-asientos").value.trim());
        if (cantidadPuertas < 2 || asientos < 2) {
            alert("La cantidad de puertas y los asientos deben ser mayores a 2 para un auto.");
            return;
        }
        otrosDatos = { cantidadPuertas, asientos };
    } else if (tipoVehiculo === "camion") {
        let carga = parseInt(document.getElementById("camion-carga").value.trim());
        let autonomia = parseInt(document.getElementById("camion-autonomia").value.trim());
        if (carga <= 0 || autonomia <= 0) {
            alert("La carga y la autonomía deben ser mayores a 0 para un camión.");
            return;
        }
        otrosDatos = { carga, autonomia };
    }


    agregarVehiculo(vehiculos, modelo, anoFabricacion, velMax, tipoVehiculo, otrosDatos);
    resetearFormularioABM();
    mostrarEnTabla(vehiculos);
});

function agregarVehiculo(vehiculos, modelo, anoFabricacion, velMax, tipoVehiculo, otrosDatos) {
    let id = generarNuevoId(vehiculos);
    let vehiculo;
    if (tipoVehiculo === "auto") {
        vehiculo = new Auto(id, modelo, anoFabricacion, velMax, otrosDatos.cantidadPuertas, otrosDatos.asientos);
    } else if (tipoVehiculo === "camion") {
        vehiculo = new Camion(id, modelo, anoFabricacion, velMax, otrosDatos.carga, otrosDatos.autonomia);
    }

    vehiculos.push(vehiculo);

}
