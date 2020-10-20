function iconsHover(elemento) {
    elemento.classList.add('icons-unhover');
}

function iconsUnhover(elemento) {
    elemento.classList.remove('icons-unhover');
}

function renderGifos(gifosList, parent) {
    gifosList.forEach((elemento) => {
        const figure = document.createElement('figure');
        figure.setAttribute("class", "gifo");
        figure.innerHTML = `<img src="${elemento.src}" class="result" alt="${elemento.alt}">
        <div class="overlay">
        <img src="images/icon-fav.svg" alt="fav" class="fav-icon">
        <img src="images/icon-fav-hover.svg" alt="fav" class="fav-icon icon-unhover">
        <img src="images/icon-max-normal.svg" alt="icon-max" class="max-button">
        <img src="images/icon-max-hover.svg" alt="icon-max" class="max-button icon-unhover">
        <img src="images/icon-download-hover.svg" alt="icon-download" class="download-button">
        <img src="images/icon-download.svg" alt="icon-download" class="download-button icon-unhover">
        </div>`;
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