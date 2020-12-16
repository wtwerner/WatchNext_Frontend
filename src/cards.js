class Card {
    constructor(movie, element = null) {
        this.movieData = movie
        this.element = element
    }
    
    createWatchListCard() {
        let main = document.getElementById("main");
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
        
        imgDiv.appendChild(figure)
        figure.appendChild(img)
        content.appendChild(pTag)
        div.appendChild(imgDiv)
        div.appendChild(content)
        footer.appendChild(watchedLink)
        footer.appendChild(removeLink)
        div.appendChild(footer)
        column.appendChild(div)
        main.appendChild(column)
    }

    createWatchedCard() {
        let main = document.getElementById("watched");
        let column = document.createElement("div");
        let div = document.createElement("div");
        let imgDiv = document.createElement("div");
        let figure = document.createElement("figure");
        let content = document.createElement("div")
        let pTag = document.createElement("p");
        let img = document.createElement("img");
        let footer = document.createElement("footer")

        img.src = IMG_URL + this.movieData.poster_path;
        imgDiv.className = "card-image";
        figure.className = "image is-2by3"
        figure.addEventListener('click', function() {
            window.open(`${MOVIE_URL+div.getAttribute('data-tmdbid')}`, '_blank');
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
        watchedLink.className = "card-footer-item has-text-danger"
        watchedLink.setAttribute("movie_id", this.movieData.tmdb_id)


        let removeLink = document.createElement("a")
        removeLink.id = "button-remove"
        removeLink.innerHTML = "Remove"
        removeLink.className = "card-footer-item"
        removeLink.setAttribute("movie_id", this.movieData.tmdb_id)
        removeLink.addEventListener('click', function(event) {
            removeFromWatchList(event.target.attributes.movie_id.value)
        })
        
        imgDiv.appendChild(figure)
        figure.appendChild(img)
        content.appendChild(pTag)
        div.appendChild(imgDiv)
        div.appendChild(content)
        footer.appendChild(watchedLink)
        footer.appendChild(removeLink)
        div.appendChild(footer)
        column.appendChild(div)
        main.appendChild(column)
    }

    createSearchCard() {
        let main = document.getElementById("search-results");
        let column = document.createElement("div");
        let div = document.createElement("div");
        let imgDiv = document.createElement("div");
        let figure = document.createElement("figure");
        let content = document.createElement("div")
        let pTag = document.createElement("p");
        let img = document.createElement("img");
        let footer = document.createElement("footer");

        img.src = IMG_URL + this.movieData.poster_path;
        imgDiv.className = "card-image";
        figure.className = "image is-2by3"
        figure.addEventListener('click', function() {
            window.open(`${MOVIE_URL+div.getAttribute('data-tmdbid')}`, '_blank');
        })

        content.className = "card-content"

        column.className = "column is-one-quarter";
        div.className = "card";
        div.setAttribute('data-tmdbid', this.movieData.tmdb_id)

        pTag.className = "title is-7"
        pTag.innerHTML = this.movieData.title+" ("+this.movieData.release_date.substring(0,4)+")";

        footer.className = "card-footer"
        
        let watchListButton = document.createElement("button")
        watchListButton.id = "button-add"
        watchListButton.innerHTML = "Add to watchlist"
        watchListButton.className = "button card-footer-item"
        watchListButton.setAttribute("movie_id", this.movieData.tmdb_id)
        watchListButton.addEventListener('click', function(event) {
            fetchMovieData(event.target.attributes.movie_id.value);
            watchListButton.innerHTML = "Added to watch list"
        })

        imgDiv.appendChild(figure)
        figure.appendChild(img)
        content.appendChild(pTag)
        footer.appendChild(watchListButton)
        div.appendChild(imgDiv)
        div.appendChild(content)
        div.appendChild(footer)
        column.appendChild(div)
        main.appendChild(column)
    }

    removeCard() {
        let card = document.getAttribute('data-tmdbid', this.id).parentElement
        card.remove()
    }
}

function createModal(movie){
    const modalDiv = document.getElementById('modal-card');
    modalDiv.innerHTML = ""

    const header = document.createElement('header');
    const title = document.createElement("p");
    const body = document.createElement("section");
    const overview = document.createElement("p")
    const footer = document.createElement("footer");

    header.className = "modal-card-head"
    title.className = "modal-card-title"
    title.innerHTML = movie.title

    body.className = "modal-card-body"
    overview.innerHTML = movie.overview

    footer.className = "modal-card-foot"

    header.appendChild(title)
    body.appendChild(overview)

    modalDiv.appendChild(title)
    modalDiv.appendChild(body)
}