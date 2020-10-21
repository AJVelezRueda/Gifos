function iconsUndisplay(elemento) {
    elemento.classList.add('icon-undisplay');
}

function iconsDisplay(elemento) {
    elemento.classList.remove('icon-undisplay');
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
        const favImgHover = creatImgObjetc("images/icon-fav-hover.svg", "fav-icon overlay-icons  icon-unhover", "fav-hover");
        const maxImg = creatImgObjetc("images/icon-max-normal.svg", "max-button overlay-icons", "icon-max");
        const maxImgHover = creatImgObjetc("images/icon-max-hover.svg", "max-button overlay-icons icon-unhover", "icon-max-hover");
        const downloadImg = creatImgObjetc("images/icon-download.svg", "download-button overlay-icons", "download-button");
        const downloadImgHover = creatImgObjetc("images/icon-download-hover.svg", "download-button overlay-icons icon-unhover", "download-button-hover");

        figure.setAttribute("class", "gifo");
        figure.appendChild(gifoImg);

        overlayDiv.appendChild(favImg);
        overlayDiv.appendChild(favImgHover);
        overlayDiv.appendChild(maxImg);
        overlayDiv.appendChild(maxImgHover);
        overlayDiv.appendChild(downloadImg);
        overlayDiv.appendChild(downloadImgHover);
        figure.appendChild(overlayDiv);


        favImg.addEventListener('click', () => {
            saveFavs(elemento);
            favImg.className = favImg.className + ' icon-undisplay';
        });

        parent.appendChild(figure);
    })
}

function getFavorites() {
    const favoritesJson = localStorage.getItem("favorites");

    if (favoritesJson) {
        return JSON.parse(favoritesJson);
    } else {
        return [];
    }
}