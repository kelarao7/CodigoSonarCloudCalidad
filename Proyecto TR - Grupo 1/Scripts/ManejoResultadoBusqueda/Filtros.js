function filtrarPorCalificacion(estrellas) {
    if (estrellas == 5) {
        var url = '@Url.Action("filtrarResultadoDeBusquedaPorCalificacion", "InformacionItemBuscado", new {cantidadEstrellas = 5})';
    } else if (estrellas == 4) {
        var url = '@Url.Action("filtrarResultadoDeBusquedaPorCalificacion", "InformacionItemBuscado", new {cantidadEstrellas = 4})';
    } else if (estrellas == 3) {
        var url = '@Url.Action("filtrarResultadoDeBusquedaPorCalificacion", "InformacionItemBuscado", new {cantidadEstrellas = 3})';
    } else if (estrellas == 2) {
        var url = '@Url.Action("filtrarResultadoDeBusquedaPorCalificacion", "InformacionItemBuscado", new {cantidadEstrellas = 2})';
    } else if (estrellas == 1) {
        var url = '@Url.Action("filtrarResultadoDeBusquedaPorCalificacion", "InformacionItemBuscado", new {cantidadEstrellas = 1})';
    }
    window.location.href = url;
}


function filtrarPorUbicacion(pais, provincia, canton) {
    var url = '/InformacionItemBuscado/filtrarResultadoDeBusquedaPorUbicacion';
    if (pais) {
        url += '?pais=' + pais;
    }
    if (provincia) {
        url += '&provincia=' + provincia;
    }
    if (canton) {
        url += '&canton=' + canton;
    }
    window.location.href = url;
}

function filtraTrueq() {
    //ToDo implementar.
    var url = '/InformacionItemBuscado/filtrarResultadoDeBusquedaPorTrueque';
    url += '?subasta=' + trueque_subasta.checked;
    url += '&circular=' + trueque_circular.checked;
    url += '&uno=' + trueque_uno_uno.checked;
    window.location.href = url;
}

function filtraEstadoProducto() {
    //ToDo implementar.
    var url = '/InformacionItemBuscado/filtrarResultadoDeBusquedaPorEstadoProducto';
    url += '?nuevo=' + trueque_nuevo.checked;
    url += '&casiNuevo=' + trueque_casiNuevo.checked;
    url += '&bueno=' + trueque_bueno.checked;
    url += '&regular=' + trueque_regular.checked;
    url += '&malo=' + trueque_malo.checked;
    window.location.href = url;
}


function agregarProvincias(data) {
    var html = "<select>";
    html += "<option value=''>Seleccione provincia </option>";
    for (key in data) {
        html += "<option value='" + data[key] + "'>" + data[key] + "</option>";
    }
    html += "</select";
    $('#provincia').html(html);

    var url = window.location.href;
    var provinciaIndex = url.indexOf('provincia=');
    if (provinciaIndex != -1) {
        var endIndex = url.indexOf('&', provinciaIndex + 10);
        if (endIndex != -1) {
            var provinciaParam = url.substring(provinciaIndex + 10, endIndex);
        }
        else {
            var provinciaParam = url.substring(provinciaIndex + 10);
        }
        provinciaParam = decodeURI(provinciaParam); //********


        if (provinciaParam) {
            $("#provincia > select").val(provinciaParam);
        }
        for (key in data) {
            if (data[key] == provinciaParam) {
                var provinciaKey = key;
            }
        }
        if (provinciaParam != "") {
            $.ajax({
                dataType: "json",
                url: "https://ubicaciones.paginasweb.cr/provincia/" + provinciaKey + "/cantones.json",
                data: {},
                success: function (data) {
                    agregarCantones(data);
                }
            });
        } else {
            $("#canton").empty();
        }
    }
}

function agregarCantones(data) {
    var html = "<select>";
    html += "<option value=''>Seleccione cantón </option>";
    for (key in data) {
        html += "<option value='" + data[key] + "'>" + data[key] + "</option>";
    }
    html += "</select";
    $('#canton').html(html);

    var url = window.location.href;
    var cantonIndex = url.indexOf('canton=');
    if (cantonIndex != -1) {
        var endIndex = url.indexOf('&', cantonIndex + 7);
        if (endIndex != -1) {
            var cantonParam = url.substring(cantonIndex + 7, endIndex);
        }
        else {
            var cantonParam = url.substring(cantonIndex + 7);
        }

        cantonParam = decodeURI(cantonParam); //********

        if (cantonParam) {
            $("#canton > select").val(cantonParam);
        }
    }
}


/*
    *Estandarizar el boton de limpiar a verde con texto blanco
    * Esta funcion llama al metodo del controlador que se encarga de deshacer los filtros
    * */
function limpiarFiltros() {
    var url = '/InformacionItemBuscado/limpiarFiltros';
    window.location.href = url;
}
