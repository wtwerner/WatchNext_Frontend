class Card {
    constructor(movie, element = null) {
        this.movieData = movie
        this.element = element
    }

    createCardDiv() {
        let column = document.createElement("div");
        let div = document.createElement("div");
        let imgDiv = document.createElement("div");
        let figure = document.createElement("figure");
        let content = document.createElement("div")
        let pTag = document.createElement("p");
        let img = document.createElement("img");
        let footer = document.createElement("footer")

        const modalBackground = document.querySelector('.modal-background')
        const modalClose = document.querySelector('.modal-close')
        const modal = document.querySelector('.modal')

        const movie = this.movieData

        img.src = IMG_URL + this.movieData.poster_path;
        imgDiv.className = "card-image";
        figure.className = "image is-2by3"
        figure.addEventListener('click', function() {
            createModal(movie)
            modal.classList.add('is-active');
        })
        modalBackground.addEventListener('click', function() {
            modal.classList.remove('is-active')
        })
        modalClose.addEventListener('click', function() {
            modal.classList.remove('is-active')
        })

        content.className = "card-content"

        column.className = "column is-one-quarter";
        div.className = "card";
        div.setAttribute('data-tmdbid', this.movieData.tmdb_id)

        pTag.className = "title is-7"
        pTag.innerHTML = this.movieData.title+" ("+this.movieData.release_date.substring(0,4)+")";

        footer.className = "card-footer"

        let watchedLink = document.createElement("a")
        watchedLink.id = "button-watched"
        watchedLink.innerHTML = "Watched"
        watchedLink.className = "card-footer-item"
        watchedLink.setAttribute("movie_id", this.movieData.tmdb_id)
        watchedLink.addEventListener('click', function(event) {
            moveToWatched(event.target.attributes.movie_id.value)
        })
        let removeLink = document.createElement("a")
        removeLink.id = "button-remove"
        removeLink.innerHTML = "Remove"
        removeLink.className = "card-footer-item"
        removeLink.setAttribute("movie_id", this.movieData.tmdb_id)
        removeLink.addEventListener('click', function(event) {
            removeFromWatchList(event.target.attributes.movie_id.value)
        })

        imgDiv.append(figure)
        figure.append(img)
        content.append(pTag)
        div.append(imgDiv, content, footer)
        footer.append(watchedLink, removeLink)
        column.append(div)

        return column
    }

    createWatchListCard(column) {
        let main = document.getElementById("main");
        main.appendChild(column)
    }

    createWatchedCard(column) {
        let main = document.getElementById("watched");
        main.appendChild(column)
    }

    createSearchCard(column) {
        let main = document.getElementById("search-results");
        main.appendChild(column)
    }

    removeCard() {
        let card = document.getAttribute('data-tmdbid', this.id).parentElement
        card.remove()
    }
}

function createModal(movie){
    const modalDiv = document.getElementById('modal-content');
    modalDiv.innerHTML = ""

    const box = document.createElement('div');
    const media = document.createElement('article');
    const image = document.createElement('div');
    const figure = document.createElement('figure');
    const imgSrc = document.createElement("img");
    const mediaContent = document.createElement("div");
    const content = document.createElement("div");
    const title = document.createElement("h6");
    const textBlock = document.createElement("div");
    const text = document.createElement("p");
    const genreBlock = document.createElement("div");
    const genre = document.createElement("p");
    const nav = document.createElement("nav");

    box.className = "box"

    media.className = "media"
    image.className = "media-left"
    figure.className = "image is-96x96"
    imgSrc.src = IMG_URL + movie.poster_path

    mediaContent.className = "media-content"
    content.className = "content"
    title.innerHTML = movie.title+" ("+movie.release_date.substring(0,4)+")";
    textBlock.className = "block"
    text.innerHTML = movie.overview
    genreBlock.classname = "block"
    genre.innerHTML = movie['genres'][0]['name']

    nav.className = "level"

    figure.appendChild(imgSrc)
    image.appendChild(figure)
    content.appendChild(title)
    textBlock.appendChild(text)
    genreBlock.appendChild(genre)
    content.appendChild(textBlock)
    content.appendChild(genreBlock)
    mediaContent.appendChild(content)
    media.appendChild(image)
    media.appendChild(mediaContent)
    media.appendChild(nav)
    box.appendChild(media)
    modalDiv.appendChild(box)
}