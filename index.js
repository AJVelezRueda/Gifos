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


//----------- Searchs --------------//
let Api_key = 'Nc8u10QS9qz9vLVNpc7W08yiQVxITRYJ'

function getSearchSugestions(query) {
    return `https://api.giphy.com/v1/gifs/search/tags?api_key=${Api_key}&q=${query}`
}


function copySugestionsInSpan(id,message){
	const span1 = document.getElementById(id);
	span1.innerText = message; 

}

function getSugestions(url) {
	fetch(getSearchSugestions(url))
	.then(response => response.json())
	.then(response => response.data)
	.catch(() => 'no hay sugerencias')
	.then(response => copySugestionsInSpan('sugerencia1',response));
}


document.getElementById('avanzar').addEventListener('click', nextCarouselImage);
document.getElementById('retroceder').addEventListener('click', backCarouselImage);

