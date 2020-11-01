const favorites = getFavorites();
const listaElementosNocturnos = ['body', 'ver-mas', 'compartir-text', 'footer-text']


function showMyFavGifos() {
    const favDiv = document.getElementById('mis-favoritos-section');

    if (favorites.length) {
        renderGifos(favorites, document.getElementById("search-results"), true);
        favDiv.classList.remove('nr')
    } else {
        favDiv.classList.add('nr')
    }
};

showMyFavGifos();

document.getElementById('boton-nocturno').addEventListener('click', () => addNocturnoMode(listaElementosNocturnos));
nocturnoModeOn(listaElementosNocturnos);