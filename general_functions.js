function iconsHover(elemento) {
    elemento.classList.add('icons-unhover');
}

function iconsUnhover(elemento) {
    elemento.classList.remove('icons-unhover');
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
        const favImg = creatImgObjetc("images/icon-fav.svg", 'fav-icon', "fav");
        const favImgHover = creatImgObjetc("images/icon-fav-hover.svg", "fav-icon icon-unhover", "fav-hover");
        const maxImg = creatImgObjetc("images/icon-max-normal.svg", "max-button", "icon-max");
        const maxImgHover = creatImgObjetc("images/icon-max-hover.svg", "max-button icon-unhover", "icon-max-hover");
        const downloadImg = creatImgObjetc("images/icon-download.svg", "download-button", "download-button");
        const downloadImgHover = creatImgObjetc("images/icon-download-hover.svg", "download-button icon-unhover", "download-button-hover");

        figure.setAttribute("class", "gifo");
        figure.appendChild(gifoImg);

        overlayDiv.appendChild(favImg);
        overlayDiv.appendChild(favImgHover);
        overlayDiv.appendChild(maxImg);
        overlayDiv.appendChild(maxImgHover);
        overlayDiv.appendChild(downloadImg);
        overlayDiv.appendChild(downloadImgHover);
        figure.appendChild(overlayDiv);

        favIcon = Array.from(figure.getElementsByClassName("fav-icon"))[0];

        favIcon.addEventListener('click', () => {
            saveFavs(elemento);
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