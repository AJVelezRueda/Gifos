const gifosResults = document.getElementById('gifos-results');
const searchInput = document.getElementById("search-input");
const searchTitle = document.getElementById("results-title");
const buscador = document.getElementById('buscador');
const searchMore = document.getElementById("ver-mas");
const searchResultGroup = document.getElementById('search-result-groups');
const sugestionsList = ['sugerencia1', 'sugerencia2', 'sugerencia3'].map((it) => document.getElementById(it));
const apiKey = 'Nc8u10QS9qz9vLVNpc7W08yiQVxITRYJ';
const listaElementosNocturnos = ['body', 'search-input', 'results', 'nav-link', 'trending-text', 'center-text', 'compartir-text', 'footer-text']


//---------- Carousel --------------//

function trendingUrl() {
    return `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25`;
}

function updateCarouselGifsSrc(gifs) {
    const gifsDiv = document.getElementById("gifs")
    renderGifos(gifs, gifsDiv);
    actualizadorClasesCarousel();
}

function getTrendingGifos() {
    fetch(trendingUrl())
        .then(response => response.json())
        .then(response => response.data.map(createGifoObject))
        .then(response => updateCarouselGifsSrc(response));
}


let carouselOffset = 0;

function actualizadorClasesCarousel() {
    const parentDiv = document.getElementById('gifs')
    const listaGifs = Array.from(parentDiv.getElementsByClassName('gifo'));

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
    return `https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=${query}`;
}

function copySugestionsInSpan(list) {
    sugestionsList.forEach((elemento, indice) => {
        elemento.innerText = list[indice] || "";
    })
}

function getSugestions(query) {
    fetch(searchSugestionsUrl(query))
        .then(response => response.json())
        .then(response => response.data.map(it => it.name))
        .catch(() => [' '])
        .then(response => copySugestionsInSpan(response));
}

function stopSearch() {
    buscador.classList.remove('searching');
}

function startSearch() {
    buscador.classList.add('searching');
}

function trySearch() {
    if (searchInput.value.length > 0) {
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

function activateResultsSection(text) {
    gifosResults.classList.add('active');
    searchTitle.innerText = text.toUpperCase();
}

function createResultsDiv() {
    const div = document.createElement('div');
    div.setAttribute("class", "search-results");
    searchResultGroup.appendChild(div);
    return div;

}

function createResultFigures(gifosList, texto) {
    activateResultsSection(texto);

    let searchResults = createResultsDiv();
    renderGifos(gifosList, searchResults);

}

function resetResultsDiv() {
    searchResultGroup.innerHTML = '';

}

function getingSearchResults(query) {
    fetch(searchMoreResultsUrl(query))
        .then(response => response.json())
        .then(response => response.data.map(it => ({ src: it.images.downsized.url, alt: it.title })))
        .then(response => createResultFigures(response, query));
}

//----- Trending -------//

function trendingWords() {
    return `https://api.giphy.com/v1/trending/searches?api_key=${apiKey}&limit=5`;
}



//------- Mis Fav ----------//

function renderMyCreatedGifs() {
    const listaMisGifs = JSON.parse(localStorage.getItem('mis_gifs'));

    renderGifos(listaMisGifs, document.getElementById("mis-gifos"), true);
}

function showingMyCreatedGifs() {
    const misGifosSection = document.getElementById('mis-gifos-section');
    const buscadorSection = document.getElementById('buscador-section');
    const trendingSection = document.getElementById('trending');

    misGifosSection.classList.add('active');
}


//----- Events ----------//
document.getElementById('avanzar').addEventListener('click', nextCarouselImage);

document.getElementById('retroceder').addEventListener('click', backCarouselImage);

searchInput.addEventListener("input", () => getSugestions(searchInput.value));

searchInput.addEventListener("input", trySearch);

searchMore.addEventListener("click", () => {
    offset += 12;
    getingSearchResults(searchInput.value);
})

document.addEventListener("click", stopSearch);

searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        offset = 0;
        resetResultsDiv();
        getingSearchResults(searchInput.value);
    }
});

sugestionsList.forEach((it) => {
    it.addEventListener("click", () => {
        offset = 0;
        resetResultsDiv();
        getingSearchResults(it.innerText);
        searchInput.value = it.innerText;
    });
});


getTrendingGifos();

document.getElementById('boton-nocturno').addEventListener('click', () => addNocturnoMode(listaElementosNocturnos));
document.getElementById('mis-gifos-button').addEventListener('click', () => showingMyCreatedGifs());
nocturnoModeOn(listaElementosNocturnos);