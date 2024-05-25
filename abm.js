/*PARA MOSTRAR LOS DATOS QUE NECESITO SEGUN EL TIPO DE VEHICULO*/
function mostrarCampos() {
    let tipoVehiculo = document.getElementById("tipoVehiculo").value;
    let camposAuto = document.getElementById("campos-auto");
    let camposCamion = document.getElementById("campos-camion");

    if (tipoVehiculo === "auto") {
        camposAuto.style.display = "block";
        camposCamion.style.display = "none";
    } else if (tipoVehiculo === "camion") {
        camposAuto.style.display = "none";
        camposCamion.style.display = "block";
    } else {
        camposAuto.style.display = "none";
        camposCamion.style.display = "none";
    }
}



/*GENERADOR DE ID A BASE DEL ARRAY DE VEHICULOS*/
function generarNuevoId(vehiculos) {
    let maxId = 0;
    vehiculos.forEach(vehiculo => {
        if (vehiculo.id > maxId) {
            maxId = vehiculo.id;
        }
    });

    let siguienteId = maxId + 1;
    return siguienteId;
}
/*BORRA TODOS LOS CAMPOS Y VIUSUALIZA DENUEVO LOS BOTONES */
function resetearFormularioABM() {
    document.querySelector(".listadoVehiculos").style.display = "block";
    document.querySelectorAll(".agregarVehiculo, .modificarVehiculo, .grabarCambios, .eliminarVehiculo, .cancelar").forEach(function(btn) {
        btn.style.display = "inline-block";});

    document.getElementById("vehiculo-id").innerText = "";
    document.getElementById("vehiculo-modelo").value = "";
    document.getElementById("vehiculo-anoFabricacion").value = "";
    document.getElementById("vehiculo-velMax").value = "";
    document.getElementById("tipoVehiculo").value = "";
    document.getElementById("auto-cantidadPuertas").value = "";
    document.getElementById("auto-asientos").value = "";
    document.getElementById("camion-carga").value = "";
    document.getElementById("camion-autonomia").value = "";
    
    document.getElementById("campos-auto").style.display = "none";
    document.getElementById("campos-camion").style.display = "none";
    document.getElementById("tipoVehiculo").disabled = false;
}


/*BOTN MODIFICAR ABM*/
document.getElementById("modificarBtn").addEventListener("click", function() {
    let id = Number(document.getElementById("vehiculo-id").textContent); 
    if (isNaN(id)) { //Pregunto si hay alg ya seleccionado
        alert("Por favor, haga doble clic en una fila de la tabla para modificar.");
        return;
    }

    let modelo = document.getElementById("vehiculo-modelo").value.trim();
    let anoFabricacion = document.getElementById("vehiculo-anoFabricacion").value.trim();
    let tipoVehiculo = document.getElementById("tipoVehiculo").value;
    let atributoExtra1 = "";
    let atributoExtra2 = "";

    if (tipoVehiculo === "auto") {
        atributoExtra1 = document.getElementById("auto-cantidadPuertas").value.trim();
        atributoExtra2 = document.getElementById("auto-asientos").value.trim();
    } else if (tipoVehiculo === "camion") {
        atributoExtra1 = document.getElementById("camion-carga").value.trim();
        atributoExtra2 = document.getElementById("camion-autonomia").value.trim();
    }

    if (modelo === "" || anoFabricacion === "" || atributoExtra1 === "" || atributoExtra2 === "" || isNaN(anoFabricacion) || isNaN(atributoExtra1) || isNaN(atributoExtra2)) {
        alert("Datos incompletos o inválidos. Por favor, complete todos los campos correctamente.");
        return;
    }

    modificarVehiculo(id, modelo, anoFabricacion, tipoVehiculo, atributoExtra1, atributoExtra2);

    resetearFormularioABM();
    document.getElementById("tipoVehiculo").disabled = false;
    mostrarEnTabla(vehiculos); // Actualizar la tabla para reflejar los cambios
});

/*BUSCA UN ID Y MODIFICA SUS DATOS*/ 
function modificarVehiculo(id, modelo, anoFabricacion, tipoVehiculo, atributoExtra1, atributoExtra2) { 
    let vehiculoIndex = vehiculos.findIndex(vehiculo => vehiculo.id === id);

    if (vehiculoIndex !== -1) {
        vehiculos[vehiculoIndex].modelo = modelo;
        vehiculos[vehiculoIndex].anoFabricacion = anoFabricacion;
        vehiculos[vehiculoIndex].tipoVehiculo = tipoVehiculo;

        if (tipoVehiculo === "auto") {
            vehiculos[vehiculoIndex].cantidadPuertas = atributoExtra1;
            vehiculos[vehiculoIndex].asientos = atributoExtra2;
            vehiculos[vehiculoIndex].carga = undefined;
            vehiculos[vehiculoIndex].autonomia = undefined;
        } else if (tipoVehiculo === "camion") {
            vehiculos[vehiculoIndex].carga = atributoExtra1;
            vehiculos[vehiculoIndex].autonomia = atributoExtra2;
            vehiculos[vehiculoIndex].cantidadPuertas = undefined;
            vehiculos[vehiculoIndex].asientos = undefined;
        }
    }
}
document.getElementById('agregarBtn').addEventListener('click', function() {
   
    document.querySelector(".listadoVehiculos").style.display = "none";

    document.querySelectorAll(".modificarVehiculo, .eliminarVehiculo").forEach(function(btn) {
        btn.style.display = "none";
    });
});
