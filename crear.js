//--------- Crear gif -----------//
function getStreamAndRecord () {
	const video = document.getElementById("video");

	navigator.mediaDevices
	.getUserMedia({ audio: false, video: true })
	.then((stream) => {
	   video.srcObject = stream;
	   video.play();
	})
	.then(recordRequest);
}


function recordInit() {
	const buttonPaso1 = document.getElementById('button-paso1');
	const comenzarButton = document.getElementById('comenzar');
	const containerDiv = document.getElementById('text-container');

	comenzarButton.classList.remove('active');
	buttonPaso1.classList.add('active');

	containerDiv.innerHTML = `<h2 class="camera-container-title">¿Nos das acceso a tu cámara?</h2>
							<p>El acceso a tu camara será válido sólo <br>por el tiempo en el que estés creando el GIFO.</p>`;
	getStreamAndRecord ();
}


function recordRequest() {
	const buttonPaso2 = document.getElementById('button-paso2');
	const buttonPaso1 = document.getElementById('button-paso1');
	const grabarButton = document.getElementById('grabar');
	const video = document.getElementById("video");
	const textContainer = document.getElementById('text-container')

	grabarButton.classList.add('active');
	buttonPaso2.classList.add('active');
	buttonPaso1.classList.remove('active');
	video.classList.add('active');
	textContainer.remove('active');
}

document.getElementById("comenzar").addEventListener('click', () => recordInit());