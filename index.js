const gifosResults = document.getElementById('gifos-results');
const searchQuery = document.getElementById("search-input");
const searchTitle = document.getElementById("results-title");
const buscador = document.getElementById('buscador');
const searchMore = document.getElementById("ver-mas");
const searchResultGroup = document.getElementById('search-result-groups');
const apiKey = 'Nc8u10QS9qz9vLVNpc7W08yiQVxITRYJ';

//---------- Carousel --------------//

function trendingUrl() {
    return `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25`
}


function updateCarouselGifsSrc(gifs) {
    const images = Array.from(document.getElementsByClassName('foto-carrusel'));
    images.forEach((elemento, indice) => {
        elemento.src = gifs[indice].src;
        elemento.alt = gifs[indice].alt;
    });
}


function getTrendingGifos() {
    fetch(trendingUrl())
        .then(response => response.json())
        .then(response => response.data.map(it => ({ src: it.images.downsized.url, alt: it.title })))
        .then(response => updateCarouselGifsSrc(response));
}


let carouselOffset = 0;

function actualizadorClasesCarousel() {
    const listaGifs = Array.from(document.getElementsByClassName('gif'));

    carouselOffset = (listaGifs.length + carouselOffset) % listaGifs.length

    listaGifs.forEach((elemento, indice) => {
        if (indice < carouselOffset || indice >= carouselOffset + 3) {
            elemento.classList.remove('active');
        } else {
            elemento.classList.add('active');
        }
    })
}

function nextCarouselImage() {
    carouselOffset += 3;

    actualizadorClasesCarousel();
}


function backCarouselImage() {
    carouselOffset -= 3;
    actualizadorClasesCarousel();
}


//---------- Search sugestions ----------//
function searchSugestionsUrl(query) {
    return `https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=${query}`
}

const sugestionslist = ['sugerencia1', 'sugerencia2', 'sugerencia3']

function copySugestionsInSpan(id, list) {
    sugestionslist.forEach((elemento, indice) => {
        const span = document.getElementById(elemento);
        span.innerText = list[indice] || "";
    })
}

function getSugestions(query) {
    fetch(searchSugestionsUrl(query))
        .then(response => response.json())
        .then(response => response.data.map(it => it.name))
        .catch(() => [' '])
        .then(response => copySugestionsInSpan('sugerencia1', response));
}

function stopSearch() {
    buscador.classList.remove('searching');
}

function startSearch() {
    buscador.classList.add('searching');
}

function trySearch() {
    if (searchQuery.value.length > 0) {
        startSearch();
    } else {
        stopSearch();
    }
}


//------- Results -------------//
let offset = 0;

function searchMoreResultsUrl(query) {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=12&offset=${offset}`;
    return url;
}

function createResultsDiv() {
    const div = document.createElement('div');
    div.setAttribute("class", "search-results");
    searchResultGroup.appendChild(div);
    return div;

}


function activateResultsSection() {
    gifosResults.classList.add('active');
    searchTitle.innerText = searchQuery.value.toUpperCase();
}

function createResultFigures(gifosList) {
    activateResultsSection();
    let searchResults = createResultsDiv();

    gifosList.forEach((elemento) => {
        figure = document.createElement('figure');
        figure.setAttribute("class", "gifo");
        figure.innerHTML = `<img src="${elemento.src}" class="result" alt="${elemento.alt}">
        <span class="overlay">
        <img src="images/icon-fav.svg" alt="fav">
        <img src="images/icon-max-normal.svg" alt="icon-max">
        <img src="images/icon-download.svg" alt="icon-download">
        </span>`;
        searchResults.appendChild(figure);
    })
}


function resetResultsDiv() {
    searchResultGroup.innerHTML = '';

}

function getingSearchResults(query) {
    fetch(searchMoreResultsUrl(query))
        .then(response => response.json())
        .then(response => response.data.map(it => ({ src: it.images.downsized.url, alt: it.title })))
        .then(response => createResultFigures(response));
}

//----- Events ----------//

document.getElementById('avanzar').addEventListener('click', nextCarouselImage);
document.getElementById('retroceder').addEventListener('click', backCarouselImage);
searchQuery.addEventListener("keypress", () => getSugestions(searchQuery.value));
searchQuery.addEventListener("keypress", trySearch);
searchMore.addEventListener("click", () => {
    offset += 12;
    getingSearchResults(searchQuery.value);
})
document.addEventListener("click", stopSearch);

searchQuery.addEventListener("change", () => {
    offset = 0;
    resetResultsDiv();
    getingSearchResults(searchQuery.value);
});

getTrendingGifos();