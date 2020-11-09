//--------- Crear gif -----------//
let recorder = null;
const apiKey = 'Nc8u10QS9qz9vLVNpc7W08yiQVxITRYJ';
const listMisFav = getMisFavorites();
const listaElementosNocturnos = ['body', 'text-camera', 'violet-line', 'camera-window', 'button-paso1', 'button-paso2', 'button-paso3', 'comenzar', 'compartir-text', 'footer-text']
const buttonPaso2 = document.getElementById('button-paso2');
const buttonPaso3 = document.getElementById('button-paso3');
const subir = document.getElementById('subir');
let timer = null;

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

    buttonPaso3.classList.remove('active');
    buttonPaso2.classList.add('active');
    subir.classList.remove('active');
    grabarButton.classList.remove('active');
    finalizarButton.classList.add('active');
    recordingTimeText.classList.add('active');
    startRecording(video.srcObject);
    startTimer();
}

function recordingFinished() {
    const recordingTimeText = document.getElementById('recording-time');
    const repetirText = document.getElementById('repetir-captura');
    const finalizar = document.getElementById("finalizar")

    recordingTimeText.classList.remove('active');
    repetirText.classList.add('active');
    buttonPaso2.classList.remove('active');
    buttonPaso3.classList.add('active');
    stopRecording();
    finalizar.classList.remove('active');
    subir.classList.add('active');
    stopTimer();
}

function createLinkImg(parent, elemento) {
    const linkImg = creatImgObject('assets/images/icon-link-normal.svg', "overlay-icons", "link-button");
    const linkImgHover = creatImgObject("assets/images/icon-link-hover.svg", "overlay-icons", "link-button-hover");

    linkImg.id = elemento.alt + '-link';
    iconsUndisplay(linkImgHover);

    parent.appendChild(linkImg);
    parent.appendChild(linkImgHover);

    linkImg.addEventListener('click', () => {
        iconHoverUnhover(linkImg, linkImgHover);
    });

    linkImgHover.addEventListener('click', () => {
        iconHoverUnhover(linkImgHover, linkImg);
    });
}


function uploadDone(gifo) {
    const parentDiv = document.getElementById('camera-container');
    const video = document.getElementById("video");
    const divIcons = document.createElement('div');
    const uploadStatusMessage = document.getElementById("upload-status-message");
    const uploadStatusImg = document.getElementById("upload-status-img");

    divIcons.classList.add('done-div-icons');
    uploadStatusMessage.innerText = 'GIFO subido con éxito';
    uploadStatusImg.src = 'assets/images/check.svg';

    createDownloadImage(divIcons, gifo);
    createLinkImg(divIcons, gifo);
    parentDiv.insertBefore(divIcons, video);

}

function recordingUpload() {
    const repetir = document.getElementById('repetir-captura');
    const cameraContainer = document.getElementById('camera-container');
    const video = document.getElementById('video');
    const divDone = document.createElement('div');
    const uploadStatusMessage = document.createElement('p');
    const uploadStatusImg = document.createElement('img');

    uploadStatusMessage.innerText = 'subiendo GIFO';
    uploadStatusMessage.id = "upload-status-message";
    uploadStatusImg.src = 'assets/images/loader.svg';
    uploadStatusImg.id = "upload-status-img";

    divDone.appendChild(uploadStatusImg);
    divDone.appendChild(uploadStatusMessage);
    cameraContainer.appendChild(divDone);
    divDone.classList.add('done-div');

    subir.classList.remove('active');
    repetir.classList.remove('active');
    buttonPaso2.classList.remove('active');
    buttonPaso3.classList.add('active');
    cameraContainer.classList.add('done');
    video.classList.add('done');
}

function recordUpload() {
    const form = new FormData();

    form.append('file', recorder.getBlob(), 'myGif.gif');
    form.append("tags", "");
    fetch(`https://upload.giphy.com/v1/gifs?api_key=${apiKey}`, {
            method: 'POST',
            body: form,
        })
        .then((it) => it.json())
        .then(it => fetchGifoObject(it.data.id))
        .then(gifo => {
            listMisFav.push(gifo);
            localStorage.setItem("mis_gifs", JSON.stringify(listMisFav));
            uploadDone(gifo);
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

function stopTimer() {
    clearInterval(timer);
}

function startTimer() {
    let sec = 60;
    timer = setInterval(function() {
        document.getElementById('recording-time').innerHTML = '00:' + sec;
        sec--;
        if (sec < 0) {
            stopTimer();
        }
    }, 1000);
}


document.getElementById("comenzar").addEventListener('click', recordInit);
document.getElementById("grabar").addEventListener('click', recording);
document.getElementById("finalizar").addEventListener('click', recordingFinished);
subir.addEventListener("click", () => {
    recordUpload();
    recordingUpload();
});

document.getElementById('boton-nocturno').addEventListener('click', () => addNocturnoMode(listaElementosNocturnos));
document.getElementById('repetir-captura').addEventListener('click', () => recording());
nocturnoModeOn(listaElementosNocturnos);