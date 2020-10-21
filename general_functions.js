const favoritesJson = localStorage.getItem("favorites");

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


function creatImgObjetc(imgSrc, imgClassName, imgAltName) {
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

function renderGifos(gifosList, parent) {
    gifosList.forEach((elemento) => {
        const figure = document.createElement('figure');
        const overlayDiv = createOverlayDiv();
        const gifoImg = creatImgObjetc(elemento.src, 'result', elemento.alt);
        const favImg = creatImgObjetc("images/icon-fav.svg", 'fav-icon overlay-icons', "fav");
        const favImgHover = creatImgObjetc("images/icon-fav-hover.svg", "fav-icon overlay-icons", "fav-hover");
        const maxImg = creatImgObjetc("images/icon-max-normal.svg", "max-button overlay-icons", "icon-max");
        const maxImgHover = creatImgObjetc("images/icon-max-hover.svg", "max-button overlay-icons", "icon-max-hover");
        const downloadImg = creatImgObjetc("images/icon-download.svg", "download-button overlay-icons", "download-button");
        const downloadImgHover = creatImgObjetc("images/icon-download-hover.svg", "download-button overlay-icons", "download-button-hover");

        figure.setAttribute("class", "gifo");
        figure.appendChild(gifoImg);

        iconsUndisplay(favImgHover);
        iconsUndisplay(maxImgHover);
        iconsUndisplay(downloadImgHover);

        overlayDiv.appendChild(favImg);
        overlayDiv.appendChild(favImgHover);
        overlayDiv.appendChild(maxImg);
        overlayDiv.appendChild(maxImgHover);
        overlayDiv.appendChild(downloadImg);
        overlayDiv.appendChild(downloadImgHover);
        figure.appendChild(overlayDiv);


        favImg.addEventListener('click', () => {
            saveFavs(elemento);
            iconHoverUnhover(favImg, favImgHover);
        });

        maxImg.addEventListener('click', () => {
            saveFavs(elemento);
            iconHoverUnhover(maxImg, maxImgHover);
        });

        downloadImg.addEventListener('click', () => {
            saveFavs(elemento);
            iconHoverUnhover(downloadImg, downloadImgHover);
        });

        favImgHover.addEventListener('click', () => {
            saveFavs(elemento);
            iconHoverUnhover(favImgHover, favImg);
        });

        maxImgHover.addEventListener('click', () => {
            saveFavs(elemento);
            iconHoverUnhover(maxImgHover, maxImg);
        });

        downloadImgHover.addEventListener('click', () => {
            saveFavs(elemento);
            iconHoverUnhover(downloadImgHover, downloadImg);
        });

        parent.appendChild(figure);
    })
}

function filterAList(list, value) {
    list = list.filter(item => item.src !== value);
    return list
}

function getFavorites() {
    if (favoritesJson) {
        return JSON.parse(favoritesJson);
    } else {
        return [];
    }
}

function deletAFavoriteItem(value) {
    const allFavorites = getFavorites();
    if (allFavorites) {
        return filterAList(allFavorites, value);
    } else {
        return allFavorites
    };
}