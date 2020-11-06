const gifosResults = document.getElementById('gifos-results');
const searchInput = document.getElementById("search-input");
const searchTitle = document.getElementById("results-title");
const buscador = document.getElementById('buscador');
const searchMore = document.getElementById("ver-mas");
const searchResultGroup = document.getElementById('search-result-groups');
const sugestionsList = ['sugerencia1', 'sugerencia2', 'sugerencia3'].map((it) => document.getElementById(it));
const apiKey = 'Nc8u10QS9qz9vLVNpc7W08yiQVxITRYJ';
const listaElementosNocturnos = ['body', 'search-input', 'results', 'nav-link', 'center-text', 'compartir-text', 'footer-text'];
const carousel = document.getElementById('carousel');
let startXPosition;
let startTime;


//---------- Carousel --------------//

function trendingUrl() {
    return `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=12`;
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

function addLupita(elemento) {
    const imgLupita = document.createElement('img');
    imgLupita.src = 'assets/images/icon-search-mod-noc.svg';
    imgLupita.alt = 'lupita';

    elemento.appendChild(imgLupita);
}

function copySugestionsInSpan(list) {
    sugestionsList.forEach((elemento, indice) => {
        elemento.innerText = list[indice] || "";
        addLupita(elemento);
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
    const lupa = document.getElementById('lupa');
    const closeIcon = document.getElementById('close-icon');

    buscador.classList.remove('searching');
    lupa.classList.add('active');
    closeIcon.classList.remove('active');
}

function startSearch() {
    const lupa = document.getElementById('lupa');
    const closeIcon = document.getElementById('close-icon');

    buscador.classList.add('searching');
    lupa.classList.remove('active');
    closeIcon.classList.add('active');
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
    searchTitle.innerText = text[0].toUpperCase() + text.slice(1, text.lenght);
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


function copyTrendingWordToSearcher(id) {
    const element = document.getElementById(id)

    textToFind = element.innerText

    if (textToFind.includes(',')) {
        getingSearchResults(textToFind.replace(',', ''));
    } else {
        getingSearchResults(textToFind);
    }
}

function getTrendingWords() {
    const trendingDiv = document.getElementById('trending')
    const listaPalabras = document.createElement('ul')

    listaPalabras.className = 'trending-text'
    listaPalabras.id = 'trending-text'

    fetch(trendingWords())
        .then(response => response.json())
        .then(response => response.data.slice(0, 4).map((it, index) => {

            if (index !== 3) {
                const liobj = document.createElement('li');

                liobj.className = "trending-text";
                liobj.id = 'Trending-Word' + index;
                liobj.innerText = it + ', ';

                listaPalabras.appendChild(liobj);
                trendingDiv.appendChild(listaPalabras);

                liobj.addEventListener('click', () => copyTrendingWordToSearcher(liobj.id));

            } else {
                const liobj = document.createElement('li');

                liobj.className = "trending-text";
                liobj.id = 'Trending-Word' + index;
                liobj.innerText = it;

                listaPalabras.appendChild(liobj);
                trendingDiv.appendChild(listaPalabras);
                liobj.addEventListener('click', () => copyTrendingWordToSearcher(liobj.id));
            };
        }))
}

//------- Mis Fav ----------//
function renderMyCreatedGifs() {
    const section = document.getElementById('mis-gifos-section');
    const misGifos = getMisFavorites();

    if (misGifos.lenght) {
        renderGifos(misGifos, document.getElementById("mis-gifos"), true);
        section.classList.remove('nr');

    } else {
        section.classList.add('nr');
    }

}

function showMyCreatedGifs() {
    const misGifosSection = document.getElementById('mis-gifos-section');
    const buscadorSection = document.getElementById('buscador-section');
    const trendingSection = document.getElementById('trending');

    misGifosSection.classList.add('active');
    buscadorSection.classList.remove('active');
    trendingSection.classList.remove('active');
    renderMyCreatedGifs();
}

function locationSensing() {
    const actualLocation = window.location.href;

    if (actualLocation.includes('#')) {
        showMyCreatedGifs();
    }
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



function touchStart(event) {
    startXPosition = event.touches[0].pageX;
    startTime = new Date();
}

function touchEnd(event) {
    let endXPosition = event.changedTouches[0].pageX;
    let endTime = new Date();
    let xMovement = endXPosition - startXPosition;
    let elapsedTime = endTime - startTime;
    let within_ms = 1000;
    let min_horizontal_move = 40;

    if (Math.abs(xMovement) > min_horizontal_move && elapsedTime < within_ms) {
        if (xMovement < 0) {
            backCarouselImage();
        } else {
            nextCarouselImage();
        }
    }
}


getTrendingGifos();

document.getElementById('boton-nocturno').addEventListener('click', () => addNocturnoMode(listaElementosNocturnos));
document.getElementById('mis-gifos-button').addEventListener('click', () => showMyCreatedGifs());
nocturnoModeOn(listaElementosNocturnos);
locationSensing();
getTrendingWords();

carousel.addEventListener('touchstart', touchStart);
carousel.addEventListener('touchend', touchEnd);