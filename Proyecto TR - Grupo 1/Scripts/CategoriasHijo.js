function sacarHijos(nombreCatPadre,nombreCatActual)
{
    var containerPadre = document.getElementById(nombreCatActual);
    var containerHijo = document.getElementById("lista" + nombreCatActual);
    var html = "";
    var stringCatPadre = "#" + nombreCatPadre;
    if (containerPadre.checked) {
        if (nombreCatPadre != "null") {
            $(stringCatPadre).prop('disabled', true);
        }
        if (containerHijo.innerHTML == "") {
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
                        html += "<input id='" + nombreCategoria + "' name = 'Nombre_Categoria_Item' value ='" + nombreCategoria + "' type='checkbox' onclick='sacarHijos("+"\""+nombreCatActual+"\""+","+"\""+nombreCategoria+"\""+")'/>";
                        html += "<label style='margin-left:5px;' for='" + nombreCategoria + "'> " + nombreCategoria + "</label>";
                        html += "<ul id='lista" + nombreCategoria + "'></ul>";
                    }
                    containerHijo.innerHTML = html;
                }
            });
        }
    }
    else {
        if (nombreCatPadre != "null") {
            $(stringCatPadre).prop('disabled', false);
        }
    }
}

function hijos(response, nombreCatPadre, nombreCatActual, nivelString,containerHijo) {
    var checks = [];
    var noChecks = [];
    var lugares = [];
    var html = "";
    for (i = 0; i < response.length; i++) {
        //console.log("response" + JSON.stringify(response[i]));
        myObj = JSON.stringify(response[i]);
        var lugar = JSON.parse(myObj).Value;

        var checkear = false;
        var deshabilitado = false;
        for (var x = 0; x < checkeados.length; x++) {
            if (lugar == checkeados[x]) {
                checkear = true;

            }
        }
        checks[i] = checkear;
        for (var x = 0; x < deshabilitados.length; x++) {
            if (lugar == deshabilitados[x]) {
                deshabilitado = true;
            }
        }
        noChecks[i] = deshabilitado;
        lugares[i] = lugar;
        html += "<li>";
        if (checkear) {
            html += "<input id='" + lugar + "'class ='Kappita' name = 'Pais' value ='" + lugar + "' type='checkbox' onclick='sacarHijosLugares(" + "\"" + nombreCatActual + "\"" + "," + "\"" + lugar + "\"" + "," + "\"" + nivelString + "\"" + ", false " + ")'checked />";
        }
        else {
            if (deshabilitado) {
                html += "<input id='" + lugar + "'class ='Kappita' name = 'Pais' value ='" + lugar + "' type='checkbox' onclick='sacarHijosLugares(" + "\"" + nombreCatActual + "\"" + "," + "\"" + lugar + "\"" + "," + "\"" + nivelString + "\"" + ", false " + ")' checked disabled/>";
            }
            else {
                html += "<input id='" + lugar + "'class ='Kappita' name = 'Pais' value ='" + lugar + "' type='checkbox' onclick='sacarHijosLugares(" + "\"" + nombreCatActual + "\"" + "," + "\"" + lugar + "\"" + "," + "\"" + nivelString + "\"" + ", false " + ")'/>";
            }

        }
        html += "<label style='margin-left:5px;' for='" + lugar + "'>" + lugar + "</label>";
        html += "<ul id='lista" + lugar + "'></ul>";
    }
    containerHijo.innerHTML = html;
    for (var x = 0; x < lugares.length; x++) {
        if (checks[x] || noChecks[x]) {
            sacarHijosLugares(nombreCatActual, lugares[x], nivelString, true);
        }
    }

}

function sacarHijosLugares(nombreCatPadre, nombreCatActual, nivel,automatico) {
    var containerPadre = document.getElementById(nombreCatActual);
    var containerHijo = document.getElementById("lista" + nombreCatActual);
    var nivelActual = parseInt(nivel) + 1;
    var nivelString = nivelActual.toString();
    var html = "";
    var stringCatPadre = "#" + nombreCatPadre;
    if (containerPadre.checked) {
        if (nombreCatPadre != "null") {
            $('input[value="' + nombreCatPadre + '"]').prop('disabled', true);
        }
        
        
        if (containerHijo.innerHTML == "") {
            $.ajax({
                url: '/HistorialTrueques/ObtenerCategoriasHijoLugar',
                type: "POST",
                dataType: "json",
                data: { nombreCatActual: nombreCatActual, nivel: nivelActual },
                success: function (response) {
                    hijos(response, nombreCatPadre, nombreCatActual, nivelString,containerHijo);
                }
            });
        }
    }
    else {
        if (nombreCatPadre != "null") {
            //If padre tiene todos los hijos sin check sin contar este
            var listapadre = "lista" + nombreCatPadre;
            var containerPadreReal = document.getElementById(listapadre);
            var hijo = containerPadreReal.firstChild;
            var areAllUnchecked = true;
            while (hijo != null) {
                var Pais = hijo.firstChild;
                Pais = Pais.nextSibling;
                var checkbox = document.getElementById(Pais.innerHTML);
                if (checkbox.checked) {
                    areAllUnchecked = false;
                }
                hijo = hijo.nextSibling;
            }
            if (areAllUnchecked) {
                $('input[value="' + nombreCatPadre + '"]').prop('disabled', false);
            }
            
        }
    }

    var selected = [];
    var disable = [];
    $('#filtros input:checked').each(function () {
        if ($(this).prop('disabled') == false) {
            selected.push($(this).attr('value'));
        }

    });
    $('#filtros input:checked').each(function () {
        if ($(this).prop('disabled') == true) {
            disable.push($(this).attr('value'));
        }

    });
    
    if (!automatico) {
        $.ajax({
            url: '/HistorialTrueques/colocarFiltrosEscogidos',
            type: 'POST',
            data: { selected: selected, disable: disable }
        });
        document.getElementById("submitBoton").click(); 
    }

    
    
}


function eliminarGraficos() {
    var id = 'calChart';
    var id2 = 'barChart';
    var id3 = 'barChartEtiquetas';
    var id4 = 'pieChart'
    var myobj = document.getElementById(id);
    myobj.remove();
    var myobj2 = document.getElementById(id2);
    myobj2.remove();
    var myobj3 = document.getElementById(id3);
    myobj3.remove();
    var myobj4 = document.getElementById(id3);
    myobj4.remove();
    this.mostrarCal(id);
    this.mostrarCatego(id2);
    this.mostrarEti(id3);
    this.mostrarPie(id4);
}



