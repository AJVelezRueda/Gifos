function iconsHover(elemento) {
    elemento.classList.add('icons-hover');

}

function iconsUnhover(elemento) {
    elemento.classList.remove('icons-hover');
}

function favIconHover(elemento) {
    iconsHover(elemento);
    elemento.classList.add('fav-icon-hover');
}

function favIconUnhover(elemento) {
    iconsUnhover(elemento);
    elemento.classList.remove('fav-icon-hover');
}


function maxIconHover(elemento) {
    iconsHover(elemento);
    elemento.classList.add('max-icon-hover');
}

function maxIconUnhover(elemento) {
    iconsUnhover(elemento);
    elemento.classList.remove('max-icon-hover');
}


function downloadIconHover(elemento) {
    iconsHover(elemento);
    elemento.classList.add('download-icon-hover');
}

function downloadIconUnhover(elemento) {
    iconsUnhover(elemento);
    elemento.classList.remove('download-icon-hover');
}


function renderGifos(gifosList, parent) {
    gifosList.forEach((elemento) => {
        figure = document.createElement('figure');
        figure.setAttribute("class", "gifo");
        figure.innerHTML = `<img src="${elemento.src}" class="result" alt="${elemento.alt}">
        <span class="overlay">
        <img src="images/icon-fav.svg" alt="fav" class="fav-icon">
        <img src="images/icon-max-normal.svg" alt="icon-max" class="max-button">
        <img src="images/icon-download-hover.svg" alt="icon-download" class="download-button">
        </span>`;
        parent.appendChild(figure);
        favIcon = Array.from(figure.getElementsByClassName("fav-icon"))[0];
        favIcon.addEventListener('click', () => {
            saveFavs(elemento);
        });
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