function iconsUndisplay(elemento) {
    elemento.classList.add('icon-undisplay');
}

function iconsDisplay(elemento) {
    elemento.classList.remove('icon-undisplay');
}


function iconHoverUnhover(elemento1, elemento2) {
    iconsUndisplay(elemento1);
    iconsDisplay(elemento2);
}


function creatImgObject(imgSrc, imgClassName, imgAltName) {
    const img = document.createElement('img');
    img.className = imgClassName;
    img.alt = imgAltName;
    img.src = imgSrc;
    return img
}


function createOverlayDiv() {
    const overlayDiv = document.createElement('div');
    overlayDiv.className = "overlay";
    return overlayDiv
}

function getFavorites() {
    const favoritesJson = localStorage.getItem("favorites");

    if (favoritesJson) {
        return JSON.parse(favoritesJson);
    } else {
        return [];
    }
}

function getMisFavorites() {
    const favoritesJson = localStorage.getItem("mis_gifs");

    if (favoritesJson) {
        return JSON.parse(favoritesJson);
    } else {
        return [];
    }
}


function getMisFavoritesObj() {
    const favoritesJson = localStorage.getItem("mis_gifs_obj");

    if (favoritesJson) {
        return JSON.parse(favoritesJson);
    } else {
        return [];
    }
}


function getModoNocturnoStatus() {
    const modoNocturnoJson = localStorage.getItem("dark_mode");

    if (modoNocturnoJson) {
        return JSON.parse(modoNocturnoJson);
    } else {
        return ['False'];
    }
}

function saveFavs(gifo) {
    const favList = getFavorites();

    favList.push(gifo);
    localStorage.setItem("favorites", JSON.stringify(favList));
}


function isFavortite(list, src) {
    return list.some(item => item.src === src);
}


function filterAList(list, value) {
    return list.filter(item => item.src !== value);
}

function deletAFavoriteItem(value) {
    const allFavorites = getFavorites();
    const filteredFavorites = filterAList(allFavorites, value);
    return localStorage.setItem("favorites", JSON.stringify(filteredFavorites));

}

function hideElement(elemento) {
    elemento.classList.remove('active')
}

function showElement(elemento) {
    elemento.classList.add('active')
}


function createGifoObject(data) {
    return { src: data.images.downsized.url, alt: data.title };
}

function createGifo(elemento) {
    const figure = document.createElement('figure');
    const gifoImg = creatImgObject(elemento.src, 'result', elemento.alt);
    figure.setAttribute("class", "gifo");
    figure.appendChild(gifoImg);
    return figure;
}


function hideAllSections() {
    const header = document.getElementById('header')
    const main = document.getElementById('main')

    hideElement(header);
    hideElement(main);
}

function showAllSections() {
    const header = document.getElementById('header')
    const main = document.getElementById('main');

    showElement(header);
    showElement(main);
}


function maximizingDiv(elemento) {
    const mainSection = document.getElementById('max-section');
    const root = document.createElement('div');
    const closeImg = document.createElement('img');
    const figure = createGifo(elemento);
    const allFavorites = getFavorites();
    const div = document.createElement('div');
    const figureTitle = document.createElement('p');
    const imgResult = figure.childNodes[0];

    figure.classList.add('max');
    imgResult.classList.add('max');
    root.className = "max-root";
    div.className = "caption-maxdiv";
    closeImg.src = "assets/images/close.svg";
    closeImg.className = "close-img";
    figureTitle.className = 'max-tex';
    figureTitle.id = 'max-tex'
    figureTitle.innerText = elemento.alt;

    closeImg.addEventListener('click', () => {
        showAllSections();
        mainSection.removeChild(root);
    })

    root.appendChild(closeImg);
    root.appendChild(figure);
    div.appendChild(figureTitle);
    createFavImage(allFavorites, elemento, div, figure, false);
    createDownloadImage(div);

    const favIcon = div.childNodes[1];
    const downloadIcon = div.childNodes[3];

    favIcon.classList.add('maxi-icons');
    downloadIcon.classList.add('maxi-icons');
    root.appendChild(div);
    mainSection.appendChild(root);
    hideAllSections();
}


function createFavImage(allFavorites, elemento, parent, figure, deleteAfterUnfav) {
    const favImg = creatImgObject("assets/images/icon-fav.svg", 'fav-icon overlay-icons', "fav");
    const favImgHover = creatImgObject("assets/images/icon-fav-hover.svg", "fav-icon overlay-icons", "fav-hover");

    if (isFavortite(allFavorites, elemento.src)) {
        iconsUndisplay(favImg);
    } else {
        iconsUndisplay(favImgHover);
    }

    parent.appendChild(favImg);
    parent.appendChild(favImgHover);


    favImg.addEventListener('click', () => {
        saveFavs(elemento);
        iconHoverUnhover(favImg, favImgHover);
    });

    favImgHover.addEventListener('click', () => {
        deletAFavoriteItem(elemento.src);

        if (deleteAfterUnfav) {
            figure.parentNode.removeChild(figure)
        } else {
            iconHoverUnhover(favImgHover, favImg);
        }
    });

}

function createDownloadImage(parent, id) {
    const downloadImg = creatImgObject("assets/images/icon-download.svg", "download-button overlay-icons", "download-button");
    const downloadImgHover = creatImgObject("assets/images/icon-download-hover.svg", "download-button overlay-icons", "download-button-hover");

    downloadImg.id = id + '-downgload';
    iconsUndisplay(downloadImgHover);

    parent.appendChild(downloadImg);
    parent.appendChild(downloadImgHover);

    downloadImg.addEventListener('click', () => {
        iconHoverUnhover(downloadImg, downloadImgHover);
    });

    downloadImgHover.addEventListener('click', () => {
        iconHoverUnhover(downloadImgHover, downloadImg);
    });
}


function renderGifos(gifosList, parent, deleteAfterUnfav = false) {
    const allFavorites = getFavorites();

    gifosList.forEach((elemento) => {
        const figure = createGifo(elemento);
        const overlayDiv = createOverlayDiv();
        createFavImage(allFavorites, elemento, overlayDiv, figure, deleteAfterUnfav);
        const maxImg = creatImgObject("assets/images/icon-max-normal.svg", "max-button overlay-icons", "icon-max");
        const maxImgHover = creatImgObject("assets/images/icon-max-hover.svg", "max-button overlay-icons", "icon-max-hover");
        createDownloadImage(overlayDiv, elemento.alt);

        iconsUndisplay(maxImgHover);

        overlayDiv.appendChild(maxImg);
        overlayDiv.appendChild(maxImgHover);
        figure.appendChild(overlayDiv);

        figure.addEventListener("mouseover", () => {
            showElement(overlayDiv);
        });
        figure.addEventListener("mouseout", () => {
            hideElement(overlayDiv);
        });

        maxImg.addEventListener('click', () => {
            maximizingDiv(elemento);
        });

        parent.appendChild(figure);

        document.getElementById(elemento.alt + '-downgload').addEventListener('click', () => downloadBlobAsFile(elemento.src));
    })
}


function addNocturnoMode(ListOfelement) {
    if (localStorage.getItem('dark_mode') === 'true') {
        localStorage.setItem('dark_mode', 'false');
    } else {
        localStorage.setItem('dark_mode', 'true');
    };
    return ListOfelement.forEach((element) => { document.getElementById(element).classList.toggle('nocturno') });
}

function nocturnoModeOn(ListOfelement) {
    if (localStorage.getItem('dark_mode') === 'true') {
        ListOfelement.forEach((element) => {
            document.getElementById(element).classList.add('nocturno');
        });
    }
}

async function downloadBlobAsFile(url) {
    const a = document.createElement('a');
    const response = await fetch(url);
    const file = await response.blob();
    a.download = 'myGif';
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
}