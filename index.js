//---------- Carousel --------------//

function trendingUrl() {
    return `https://api.giphy.com/v1/gifs/trending?api_key=${Api_key}&limit=25`
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
let Api_key = 'Nc8u10QS9qz9vLVNpc7W08yiQVxITRYJ'

function searchSugestionsUrl(query) {
    return `https://api.giphy.com/v1/gifs/search/tags?api_key=${Api_key}&q=${query}`
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
    const buscador = document.getElementById('buscador')
    buscador.classList.remove('searching');
}

function startSearch() {
    const buscador = document.getElementById('buscador')
    buscador.classList.add('searching');
}

function trySearch() {
    const inputButton = document.getElementById("search-input")
    if (inputButton.value.length > 0) {
        startSearch();
    } else {
        stopSearch();
    }
}


//------- Results -------------//

function searchResultsUrl(query) {
    return `https://api.giphy.com/v1/gifs/search?api_key=${Api_key}&q=${query}&limit=12`
}

function createResultsDiv() {
    const parentDiv = document.getElementById('search-result-groups');
    const div = document.createElement('div');
    div.setAttribute("class", "search-results");
    parentDiv.appendChild(div);
    return div;

}


function activateResultsSection() {
    const parentDiv = document.getElementById('gifos-results');
    const searchQuery = document.getElementById("search-input");
    const searchTitle = document.getElementById("results-title");
    parentDiv.classList.add('active');
    searchTitle.innerText = searchQuery.value.toUpperCase();
}

function createResultFigures(gifosList) {
    activateResultsSection();
    let searchResults = createResultsDiv();

    gifosList.forEach((elemento) => {
        figure = document.createElement('figure');
        figure.setAttribute("class", "gifo")
        figure.innerHTML = `<img src="${elemento.src}" class="result" alt="${elemento.alt}">`;
        searchResults.appendChild(figure);
    })
}

function getingSearchResults(query) {
    fetch(searchResultsUrl(query))
        .then(response => response.json())
        .then(response => response)
        .then(response => response.data.map(it => ({ src: it.images.downsized.url, alt: it.title, width: it.images.downsized.width, heigth: it.images.downsized.heigth })))
        .then(response => createResultFigures(response));
}

function getMoreResults() {
    getingSearchResults(query)
}

//----- Events ----------//

document.getElementById('avanzar').addEventListener('click', nextCarouselImage);
document.getElementById('retroceder').addEventListener('click', backCarouselImage);

let searchQuery = document.getElementById("search-input");
searchQuery.addEventListener("keypress", () => getSugestions(searchQuery.value));
searchQuery.addEventListener("keypress", trySearch);
document.addEventListener("click", stopSearch);

searchQuery.addEventListener("change", () => getingSearchResults(searchQuery.value));

getTrendingGifos();