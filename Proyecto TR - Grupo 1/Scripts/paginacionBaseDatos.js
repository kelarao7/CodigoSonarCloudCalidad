function paginacionBaseDatos(numPagina) {
    event.preventDefault();
    var url = '@Url.Action("DesplegarResultadosDeBusqueda", "InformacionItemBuscado", new {numeroPagina = numPagina})';
    window.location.href = url;
}