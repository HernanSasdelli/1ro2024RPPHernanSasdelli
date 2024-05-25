// Mostrar los datos de los vehículos en la tabla
function mostrarEnTabla(vehiculos) {
    let tbody = document.querySelector("#tablaVehiculos tbody");
    tbody.innerHTML = "";

    let filasHTML = vehiculos.map(function(vehiculo) {
        let filaCampos = [];

        filaCampos.push("<tr class='infoTabla'>");
        filaCampos.push("<td class='tablaID'>" + vehiculo.id + "</td>");
        filaCampos.push("<td class='tablaModelo'>" + vehiculo.modelo + "</td>");
        filaCampos.push("<td class='tablaAno'>" + vehiculo.anoFabricacion + "</td>");
        filaCampos.push("<td class='tablaVelMax'>" + vehiculo.velMax + "</td>");

        if (vehiculo.cantidadPuertas !== undefined && vehiculo.asientos !== undefined) {
            filaCampos.push("<td class='tablaCantidadPuertas'>" + vehiculo.cantidadPuertas + "</td>");
            filaCampos.push("<td class='tablaAsientos'>" + vehiculo.asientos + "</td>");
            filaCampos.push("<td class='tablaCarga'></td>");
            filaCampos.push("<td class='tablaAutonomia'></td>");
        } else {
            filaCampos.push("<td class='tablaCantidadPuertas'></td>");
            filaCampos.push("<td class='tablaAsientos'></td>");
            filaCampos.push("<td class='tablaCarga'>" + vehiculo.carga + "</td>");
            filaCampos.push("<td class='tablaAutonomia'>" + vehiculo.autonomia + "</td>");
        }

        filaCampos.push("</tr>");

        return filaCampos.join("");
    });

    tbody.innerHTML = filasHTML.join("");
}
/*FILTRAR AUTOS Y CAMIONES (BOTÓN)*/
function filtrarVehiculos() {
    resetearVisibilidadColumnas(); // Al final, resetea la vista para que no queden datos colgados
    let filtro = document.querySelector("#filtroTipo").value;
    
    let vehiculosFiltrados = filtrarVehiculosPorTipo(filtro);
    mostrarEnTabla(vehiculosFiltrados); 
}

/*SEGÚN EL FILTRO SELECCIONADO EN LA TABLA, DEVUELVE UN ARRAY FILTRADO*/
/*USO DE FILTER*/
function filtrarVehiculosPorTipo(filtro) {
    switch (filtro) {
        case "todos":
            return vehiculos;
        case "auto":
            return vehiculos.filter(vehiculo => vehiculo instanceof Auto);
        case "camion":
            return vehiculos.filter(vehiculo => vehiculo instanceof Camion);
        default:
            return [];
    }
}



// Calcular la velocidad máxima promedio de los vehículos
/*USO REDUCE*/
function calcularVelMaxPromedio() {
    let filtro = document.querySelector("#filtroTipo").value;
    let vehiculosFiltrados = filtrarVehiculosPorTipo(filtro);
    let totalVelMax = vehiculosFiltrados.reduce((acumulador, vehiculo) => acumulador + vehiculo.velMax, 0);
    let promedioVelMax = totalVelMax / vehiculosFiltrados.length;
    alert("Velocidad Máxima Promedio: " + promedioVelMax.toFixed(2));
}


// Checkboxes para mostrar/ocultar columnas
document.getElementById("checkID").addEventListener("change", function() {
    let columnaID = document.querySelectorAll(".tablaID");

    if (this.checked) {
        mostrarColumna(columnaID);
    } else {
        ocultarColumna(columnaID);
    }
});
document.getElementById("checkModelo").addEventListener("change", function() {
    let columnaModelo = document.querySelectorAll(".tablaModelo");

    if (this.checked) {
        mostrarColumna(columnaModelo);
    } else {
        ocultarColumna(columnaModelo);
    }
});
document.getElementById("checkAnoFabricacion").addEventListener("change", function() {
    let columnaAno = document.querySelectorAll(".tablaAno,.tablaAnoFabricacion");

    if (this.checked) {
        mostrarColumna(columnaAno);
    } else {
        ocultarColumna(columnaAno);
    }
});
document.getElementById("checkVelMax").addEventListener("change", function() {
    let columnaVelMax = document.querySelectorAll(".tablaVelMax");

    if (this.checked) {
        mostrarColumna(columnaVelMax);
    } else {
        ocultarColumna(columnaVelMax);
    }
});
document.getElementById("checkCantidadPuertas").addEventListener("change", function() {
    let columnaCantidadPuertas = document.querySelectorAll(".tablaCantidadPuertas");

    if (this.checked) {
        mostrarColumna(columnaCantidadPuertas);
    } else {
        ocultarColumna(columnaCantidadPuertas);
    }
});
document.getElementById("checkAsientos").addEventListener("change", function() {
    let columnaAsientos = document.querySelectorAll(".tablaAsientos");

    if (this.checked) {
        mostrarColumna(columnaAsientos);
    } else {
        ocultarColumna(columnaAsientos);
    }
});
document.getElementById("checkCarga").addEventListener("change", function() {
    let columnaCarga = document.querySelectorAll(".tablaCarga");

    if (this.checked) {
        mostrarColumna(columnaCarga);
    } else {
        ocultarColumna(columnaCarga);
    }
});
document.getElementById("checkAutonomia").addEventListener("change", function() {
    let columnaAutonomia = document.querySelectorAll(".tablaAutonomia");

    if (this.checked) {
        mostrarColumna(columnaAutonomia);
    } else {
        ocultarColumna(columnaAutonomia);
    }
});

function mostrarColumna(columna) {
    columna.forEach(function(celda) {
        celda.style.display = "table-cell";
    });
}

function ocultarColumna(columna) {
    columna.forEach(function(celda) {
        celda.style.display = "none";
    });
}

// Funciones estrella para arreglar visibilidad
function resetearVisibilidadColumnas() {
    resetearChecks();
    let columnas = document.querySelectorAll("#tablaVehiculos th");
    columnas.forEach(function(columna) {
        columna.style.display = "table-cell";
    });
}

function resetearChecks() {
    let checkboxes = document.querySelectorAll(".tabla_checkbox input[type='checkbox']");
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = true;
    });
}


/*DOBLE CLICK EN FORMULARIO*/
document.getElementById("tablaVehiculos").addEventListener("dblclick", function(event) {
    let filaSeleccionada = event.target.closest("tr");
    let idVehiculo = parseInt(filaSeleccionada.querySelector(".tablaID").innerText);
    let vehiculo = vehiculos.find(v => v.id === idVehiculo);

    document.getElementById("vehiculo-id").innerText = vehiculo.id;
    document.getElementById("vehiculo-modelo").value = vehiculo.modelo;
    document.getElementById("vehiculo-anoFabricacion").value = vehiculo.anoFabricacion;
    document.getElementById("vehiculo-velMax").value = vehiculo.velMax; // Agregar velocidad máxima

    if (vehiculo instanceof Auto) {
        document.getElementById("tipoVehiculo").value = "auto";
        document.getElementById("auto-cantidadPuertas").value = vehiculo.cantidadPuertas;
        document.getElementById("auto-asientos").value = vehiculo.asientos;
        document.getElementById("campos-auto").style.display = "block";
        document.getElementById("campos-camion").style.display = "none";

    } else if (vehiculo instanceof Camion) {
        document.getElementById("tipoVehiculo").value = "camion";
        document.getElementById("camion-carga").value = vehiculo.carga;
        document.getElementById("camion-autonomia").value = vehiculo.autonomia;
        document.getElementById("campos-auto").style.display = "none";
        document.getElementById("campos-camion").style.display = "block";
    }

    document.getElementById("tipoVehiculo").disabled = true;
    document.querySelector(".listadoVehiculos").style.display = "none";
    document.querySelectorAll(" .agregarVehiculo, .eliminarVehiculo").forEach(function(btn) {
        btn.style.display = "none";
    });
});





