
function filtrarTrueques() {

    var subasta = document.getElementById("trueque_subasta").checked;
    var circular = document.getElementById("trueque_circular").checked;
    var uno_uno = document.getElementById("trueque_uno_uno").checked;

    var filterS = "VACIO";
    var filterC = "VACIO";
    var filterU = "VACIO";

    if (subasta == true) { filterS = "SUBASTA"; }
    if (circular == true) { filterC = "CIRCULAR"; }
    if (uno_uno == true) { filterU = "DIRECTO"; }

    var input, filter, cards, cardContainer, text, title, i;
    input = document.getElementById("myFilter");

    cardContainer = document.getElementById("container"); // container de cards
    cards = cardContainer.getElementsByClassName("card"); //clase de cards

    for (i = 0; i < cards.length; i++) {
        title = cards[i].querySelector(".card-body label.text");
        if (title.innerText.toUpperCase().indexOf(filterS) > -1 || title.innerText.toUpperCase().indexOf(filterC) > -1 || title.innerText.toUpperCase().indexOf(filterU) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
    if (filterS == "VACIO" && filterC == "VACIO" && filterU == "VACIO") {
        for (i = 0; i < cards.length; i++) {
            cards[i].style.display = "";
        }
    }
}

function limpiar() {
    var datos = document.getElementsByName("tipTrue");
    for (i in datos) {
        datos[i].style.display = 'none';
    }
}