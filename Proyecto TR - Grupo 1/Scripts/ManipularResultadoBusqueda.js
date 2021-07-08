function ordenar(value) {
    event.preventDefault();
    if (value == 1) {
        var url = '@Url.Action("DesplegarResultadosDeBusqueda", "InformacionItemBuscado", new { criterioBusqueda = "VAL", id = (int?)1 })';
    } else if (value == 2) {
        var url = '@Url.Action("DesplegarResultadosDeBusqueda", "InformacionItemBuscado", new { criterioBusqueda = "VAL", id = (int?)2 })';
    } else if (value == 0) {
        var url = '@Url.Action("DesplegarResultadosDeBusqueda", "InformacionItemBuscado", new { criterioBusqueda = "VAL", id = (int?)0 })';
    }
    window.location.href = url;
}