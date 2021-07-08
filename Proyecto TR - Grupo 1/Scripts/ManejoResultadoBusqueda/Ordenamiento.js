
function ordenar(value) {
    event.preventDefault();
    if (value == 1) {
        var url = '@Url.Action("ordernarResultadoDeBusqueda", "InformacionItemBuscado", new { tipoOrdenamiento = (int?)1 })';
    } else if (value == 2) {
        var url = '@Url.Action("ordernarResultadoDeBusqueda", "InformacionItemBuscado", new { tipoOrdenamiento = (int?)2 })';
    } else if (value == 0) {
        var url = '@Url.Action("ordernarResultadoDeBusqueda", "InformacionItemBuscado", new { tipoOrdenamiento = (int?)0 })';
    } else if (value == 3) {
        var url = '@Url.Action("ordernarResultadoDeBusqueda", "InformacionItemBuscado", new { tipoOrdenamiento = (int?)3 })';
    }
    // alert(url);
    window.location.href = url;
}