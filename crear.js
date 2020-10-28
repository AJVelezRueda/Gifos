//--------- Crear gif -----------//
let recorder = null;
const apiKey = 'Nc8u10QS9qz9vLVNpc7W08yiQVxITRYJ';
const listMisFav = getMisFavorites();
const listaElementosNocturnos = ['body','text-camera','violet-line','camera-window','button-paso1','button-paso2','button-paso3','comenzar','compartir-text','footer-text']


function requestVideo() {
    const video = document.getElementById("video");

    navigator.mediaDevices
        .getUserMedia({ audio: false, video: true })
        .then((stream) => {
            video.srcObject = stream;
            video.play();
        })
        .then(recordRequest);
}

function startRecording(stream) {
    recorder = RecordRTC(stream, {
        type: "gif",
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
    });
    recorder.startRecording();
}


function stopRecording() {
    recorder
        .stopRecording();
    console.log(recorder);
}


function recordInit() {
    const buttonPaso1 = document.getElementById('button-paso1');
    const comenzarButton = document.getElementById('comenzar');
    const containerDiv = document.getElementById('text-container');

    comenzarButton.classList.remove('active');
    buttonPaso1.classList.add('active');

    containerDiv.innerHTML = `<h2 class="camera-container-title">¿Nos das acceso a tu cámara?</h2>
							<p>El acceso a tu camara será válido sólo <br>por el tiempo en el que estés creando el GIFO.</p>`;
    requestVideo();
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

function recording() {
    const grabarButton = document.getElementById('grabar');
    const finalizarButton = document.getElementById('finalizar');
    const recordingTimeText = document.getElementById('recording-time')
    const video = document.getElementById("video");

    grabarButton.classList.remove('active');
    finalizarButton.classList.add('active');
    recordingTimeText.classList.add('active');
    startRecording(video.srcObject);
}

function recordingFinished() {
    const recordingTimeText = document.getElementById('recording-time');
    const repetirText = document.getElementById('repetir-captura');
    const buttonPaso2 = document.getElementById('button-paso2');
    const buttonPaso3 = document.getElementById('button-paso3');
    const subir = document.getElementById('subir')
    const finalizar = document.getElementById("finalizar")

    recordingTimeText.classList.remove('active');
    repetirText.classList.add('active');
    buttonPaso2.classList.remove('active');
    buttonPaso3.classList.add('active');
    stopRecording();
    finalizar.classList.remove('active');
    subir.classList.add('active');
}

function recordUpload() {
    const form = new FormData();

    form.append('file', recorder.getBlob(), 'myGif.gif');
    form.append("tags", "");
    fetch(`http://upload.giphy.com/v1/gifs?api_key=${apiKey}`, {
            method: 'POST',
            body: form,
        })
        .then((it) => it.json())
        .then(it => fetchGifoObject(it.data.id))
        .then(gifo => {
            listMisFav.push(gifo);
            localStorage.setItem("mis_gifs", JSON.stringify(listMisFav));
        });
}

function getUrlMyGif(id) {
    return `https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${id}`;
}

function fetchGifoObject(id) {
    return fetch(getUrlMyGif(id))
        .then(response => response.json())
        .then(response => createGifoObject(response.data[0]));
}

document.getElementById("comenzar").addEventListener('click', recordInit);
document.getElementById("grabar").addEventListener('click', recording);
document.getElementById("finalizar").addEventListener('click', recordingFinished);
document.getElementById("subir").addEventListener("click", recordUpload)

document.getElementById('boton-nocturno').addEventListener('click', () => addNocturnoMode(listaElementosNocturnos));
nocturnoModeOn(listaElementosNocturnos);