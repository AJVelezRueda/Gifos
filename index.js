//fetch('https://api.giphy.com/v1/gifs/search?api_key=Nc8u10QS9qz9vLVNpc7W08yiQVxITRYJ&q=hamburguer').then(it => it.json().then(it => console.log(it))) ..//

let carouselOffset = 0;


function actualizadorClasesCarousel () {
	const listaGifs = Array.from(document.getElementsByClassName('gif'));

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


document.getElementById('avanzar').addEventListener('click', nextCarouselImage)
document.getElementById('retroceder').addEventListener('click', backCarouselImage)