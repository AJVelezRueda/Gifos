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


function renderGifos(gifosList, parent, deleteAfterUnfav = false) {
    const allFavorites = getFavorites();

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

        if (isFavortite(allFavorites, elemento.src)) {
            iconsUndisplay(favImg);
        } else {
            iconsUndisplay(favImgHover);
        }

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
            iconHoverUnhover(maxImg, maxImgHover);
        });

        downloadImg.addEventListener('click', () => {
            iconHoverUnhover(downloadImg, downloadImgHover);
        });

        favImgHover.addEventListener('click', () => {
            deletAFavoriteItem(elemento.src);
            if (deleteAfterUnfav) {
                parent.removeChild(figure)
            } else {
                iconHoverUnhover(favImgHover, favImg);
            }
        });

        maxImgHover.addEventListener('click', () => {
            iconHoverUnhover(maxImgHover, maxImg);
        });

        downloadImgHover.addEventListener('click', () => {
            iconHoverUnhover(downloadImgHover, downloadImg);
        });

        parent.appendChild(figure);
    })
}