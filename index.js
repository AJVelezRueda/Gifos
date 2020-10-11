//fetch('https://api.giphy.com/v1/gifs/search?api_key=Nc8u10QS9qz9vLVNpc7W08yiQVxITRYJ&q=hamburguer').then(it => it.json().then(it => console.log(it))) ..//


//---------- Carousel --------------//
let carouselOffset = 0;

function actualizadorClasesCarousel () {
	const listaGifs = Array.from(document.getElementsByClassName('gif'));

	carouselOffset = (listaGifs.length + carouselOffset) % listaGifs.length

	listaGifs.forEach((elemento, indice) => {
		if (indice < carouselOffset || indice >= carouselOffset +3) {
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

function copySugestionsInSpan(id,list){
	sugestionslist.forEach((elemento,indice) => {
		const span = document.getElementById(elemento);
		span.innerText = list[indice] ||  ""; 
	})
}

function getSugestions(url) {
	fetch(searchSugestionsUrl(url))
	.then(response => response.json())
	.then(response => response.data.map(it => it.name))
	.catch(() => [' '])
	.then(response => copySugestionsInSpan('sugerencia1',response));
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


document.getElementById('avanzar').addEventListener('click', nextCarouselImage);
document.getElementById('retroceder').addEventListener('click', backCarouselImage);

let searchQuery = document.getElementById("search-input");
searchQuery.addEventListener("keypress", () => getSugestions(searchSugestionsUrl(searchQuery.value)));
searchQuery.addEventListener("keypress", trySearch);
document.addEventListener("click", stopSearch);

