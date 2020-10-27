const favorites = getFavorites();
const listaElementosNocturnos = ['body', 'ver-mas', 'compartir-text', 'footer-text']


nocturnoModeOn(listaElementosNocturnos);
renderGifos(favorites, document.getElementById("search-results"), true);

document.getElementById('boton-nocturno').addEventListener('click', () => modoNocturno(listaElementosNocturnos));