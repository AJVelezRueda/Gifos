function IconsHover(elemento) {
    elemento.classList.add('icons-hover');
}


function IconsUnhover(elemento) {
    elemento.classList.remove('icons-hover');
}

function renderGifos(gifosList, parent) {
    gifosList.forEach((elemento) => {
        figure = document.createElement('figure');
        figure.setAttribute("class", "gifo");
        figure.innerHTML = `<img src="${elemento.src}" class="result" alt="${elemento.alt}">
        <span class="overlay">
        <img src="images/icon-fav.svg" alt="fav" class="fav-icon">
        <img src="images/icon-max-normal.svg" alt="icon-max" class="max-button">
        <img src="images/icon-download.svg" alt="icon-download" class="download-button">
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