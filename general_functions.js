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
    const main = document.getElementById('main')

    showElement(header);
    showElement(main);
}


function maximizingDiv(elemento) {
    const mainSection = document.getElementById('max-section')
    const root = document.createElement('div');
    const closeImg = document.createElement('img')
    const figure = createGifo(elemento);
    const allFavorites = getFavorites();
    const div = document.createElement('div');
    const figureTitle = document.createElement('p')

    root.className = "max-root"
    div.className = "caption-maxdiv"
    closeImg.src = "images/close.svg"
    closeImg.className = "close-img"
    figureTitle.innerText = elemento.alt

    closeImg.addEventListener('click', () => {
        showAllSections();
        mainSection.removeChild(root);
    })

    root.appendChild(closeImg);
    root.appendChild(figure);
    div.appendChild(figureTitle);
    createFavImage(allFavorites, elemento, div, figure, false);
    createDownloadImage(div);
    root.appendChild(div);
    mainSection.appendChild(root);
    hideAllSections();
}


function createFavImage(allFavorites, elemento, parent, figure, deleteAfterUnfav) {
    const favImg = creatImgObject("images/icon-fav.svg", 'fav-icon overlay-icons', "fav");
    const favImgHover = creatImgObject("images/icon-fav-hover.svg", "fav-icon overlay-icons", "fav-hover");

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
            parent.removeChild(figure)
        } else {
            iconHoverUnhover(favImgHover, favImg);
        }
    });

}

function createDownloadImage(parent) {
    const downloadImg = creatImgObject("images/icon-download.svg", "download-button overlay-icons", "download-button");
    const downloadImgHover = creatImgObject("images/icon-download-hover.svg", "download-button overlay-icons", "download-button-hover");

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
        const maxImg = creatImgObject("images/icon-max-normal.svg", "max-button overlay-icons", "icon-max");
        const maxImgHover = creatImgObject("images/icon-max-hover.svg", "max-button overlay-icons", "icon-max-hover");
        createDownloadImage(overlayDiv);

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
            iconHoverUnhover(maxImg, maxImgHover);
            maximizingDiv(elemento);
        });

        maxImgHover.addEventListener('click', () => {
            iconHoverUnhover(maxImgHover, maxImg);
        });

        parent.appendChild(figure);
    })
}