function sacarHijos(nombreCatPadre, nombreCatActual) {
    var containerPadre = document.getElementById(nombreCatActual);
    var containerHijo = document.getElementById("lista" + nombreCatActual);
    if (containerPadre.checked) {
        if (containerHijo.innerHTML == "") {
            html = "";
            $.ajax({
                url: '/Items/ObtenerCategoriasHijo',
                type: "POST",
                dataType: "json",
                data: { nombreCatActual: nombreCatActual },
                success: function (response) {
                    for (i = 0; i < response.length; i++) {
                        console.log("response" + JSON.stringify(response[i]));
                        myObj = JSON.stringify(response[i]);
                        console.log(JSON.parse(myObj).Nombre_Categoria);
                        var nombreCategoria = JSON.parse(myObj).Nombre_Categoria;
                        html += "<li>";
                        html += "<input id='" + nombreCategoria + "' name = 'Nombre_Categoria_Item' value ='" + nombreCategoria + "' type='checkbox' onclick='sacarHijos(" + "\"" + nombreCatActual + "\"" + "," + "\"" + nombreCategoria + "\"" + ")'/>";
                        html += "<label id='label" + nombreCategoria + "' style='margin-left:3px;' class='categoria' onClick='modificarCategoria(false, \"" + nombreCategoria + "\")'>" + nombreCategoria + "</label>";
                        html += "<ul id='lista" + nombreCategoria + "'></ul>";
                        html += "</li>";
                    }
                    html += "<li id='agregarPara" + nombreCatActual + "'><a class='botonAgregar' onclick='agregarCategoria(false, \"" + nombreCatActual + "\")'>+ Agregar</a></li>";
                    containerHijo.innerHTML = html;
                }
            });
        }
    }
}

function agregarCategoria(guardar, nombrePadre) {
    if (guardar) {
        var nuevaCat = document.getElementById("nombreAgregado");
        if (nuevaCat.value != "" && nuevaCat.value != null) {
            if (!nuevaCat.value.includes(';') && !nuevaCat.value.includes("=") && !nuevaCat.value.includes("\"") && !nuevaCat.value.includes("\'")) {
                var repetido = document.getElementById("listaCategorias").innerHTML.indexOf(">" + nuevaCat.value + "<");
                if (repetido == -1) {
                    var padre = document.getElementById("nombrePadreAgregado").value;
                    document.getElementById("hiddenList").innerHTML += "<input type='hidden' value='" + nuevaCat.value + "' name='agregados' />"
                    document.getElementById("hiddenList").innerHTML += "<input type='hidden' value='" + padre + "' name='agregados' />"
                    $('#agregarModal').modal('hide');
                    if (padre == "null") {
                        var lista = document.getElementById("listaCategorias");
                        var buscar = "agregarParaPrincipales";
                    } else {
                        var lista = document.getElementById("lista" + padre);
                        var buscar = "agregarPara" + padre;
                    }
                    var index = lista.innerHTML.indexOf(buscar) - 8;
                    var conservar = lista.innerHTML.slice(0, index);
                    var html = conservar;
                    html += "<li>";
                    html += "<input id='" + nuevaCat.value + "' name = 'Nombre_Categoria_Item' value ='" + nuevaCat.value + "' type='checkbox' onclick='sacarHijos(" + "\"" + padre + "\"" + "," + "\"" + nuevaCat.value + "\"" + ")'/>";
                    html += "<label id=\"label" + nuevaCat.value + "\" style='margin-left:5px;' class='categoria' onclick='modificarCategoria(false, \"" + nuevaCat.value + "\")'>" + nuevaCat.value + "</label>";
                    html += "<ul id='lista" + nuevaCat.value + "'></ul></li >";
                    html += "<li id='" + buscar + "'><a class='botonAgregar' onclick='agregarCategoria(false, \"" + padre + "\")'>+ Agregar</a></li>";
                    lista.innerHTML = html;
                    nuevaCat.value = "";
                } else {
                    document.getElementById("tituloError").innerHTML = "Error al agregar una categoría:";
                    document.getElementById("cuerpoError").innerHTML = "Verifique que no hay otra categoría con el mismo nombre";
                    $('#agregarModal').modal('hide');
                    $('#errorModal').modal('show');
                    document.getElementById("nombreAgregado").value = "";
                }
            } else {
                document.getElementById("tituloError").innerHTML = "Símbolo incorrecto:";
                document.getElementById("cuerpoError").innerHTML = "El nombre de una categoría no puede contener '=', ';' ni comillas simples o dobles.";
                $('#errorModal').modal('show');
            }
        }
    } else {
        document.getElementById("nombrePadreAgregado").value = nombrePadre;
        $('#agregarModal').modal('show');
        document.getElementById("nombreAgregado").value = "";
    }
}

function modificarCategoria(guardar, nombreAnterior) {
    if (guardar) {
        var nombre = document.getElementById("nuevoNombre").value;
        if (nombre != null && nombre != "") {
            if (!nombre.includes(";") && !nombre.includes("=") && !nombre.includes("\"") && !nombre.includes("\'")) {
                var repetido = document.getElementById("listaCategorias").innerHTML.indexOf(">" + nombre + "<");
                if (repetido == -1) {
                    var nuevaCat = document.getElementById("nuevoNombre");
                    var anterior = document.getElementById("categoria");
                    document.getElementById("hiddenList").innerHTML += "<input type='hidden' value='" + nuevaCat.value + "' name='modificados' />"
                    document.getElementById("hiddenList").innerHTML += "<input type='hidden' value='" + document.getElementById("nombreAnterior").value + "' name='modificados' />"
                    document.getElementById("label" + anterior.value).innerHTML = nuevaCat.value;
                    $('#modificarModal').modal('hide');
                    nuevaCat.value = "";
                    anterior.value = "";
                } else {
                    document.getElementById("tituloError").innerHTML = "Símbolo incorrecto:";
                    document.getElementById("cuerpoError").innerHTML = "Verifique que no hay otra categoría con el mismo nombre.";
                    $('#modificarModal').modal('hide');
                    $('#errorModal').modal('show');
                    document.getElementById("nuevoNombre").value = "";
                }
            } else {
                document.getElementById("tituloError").innerHTML = "Caracter inválido:";
                document.getElementById("cuerpoError").innerHTML = "El nombre de una categoría no puede contener '=', ';' ni comillas simples o dobles.";
                $('#errorModal').modal('show');
            }
        }
    } else {
        $('#modificarModal').modal('show');
        var id = "label" + nombreAnterior;
        var value = document.getElementById(id).innerHTML;
        document.getElementById("nombreAnterior").value = value;
        document.getElementById("categoria").value = nombreAnterior;
        document.getElementById("nuevoNombre").value = "";
    }
}