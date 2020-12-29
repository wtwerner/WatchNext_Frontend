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

        let modalBackground = document.querySelector('.modal-background')
        let modalClose = document.querySelector('.modal-close')
        let modal = document.querySelector('.modal')

        let movie = this.movieData
        let card = this

        img.src = IMG_URL + this.movieData.poster_path;
        imgDiv.className = "card-image";
        figure.className = "image is-2by3"
        figure.addEventListener('click', function() {
            card.createModal(movie)
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
        watchedLink.addEventListener('click', function() {
            moveToWatched(movie)
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
        main.append(column)
    }

    createWatchedCard(column) {
        let main = document.getElementById("watched");
        main.append(column)
    }

    createSearchCard(column) {
        let footer = column.querySelector(".card-footer")
        footer.innerHTML = ""

        let watchListButton = document.createElement("button")
        watchListButton.id = "button-add"
        watchListButton.innerHTML = "Add to watchlist"
        watchListButton.className = "button card-footer-item"
        watchListButton.setAttribute("movie_id", this.movieData.tmdb_id)
        watchListButton.addEventListener('click', function(event) {
            fetchMovieData(event.target.attributes.movie_id.value);
            watchListButton.innerHTML = "Added to watch list"
        })

        let main = document.getElementById("search-results");
        footer.append(watchListButton)
        main.append(column)
    }

    removeCard() {
        let card = document.getAttribute('data-tmdbid', this.id).parentElement
        card.remove()
    }

    createModal(movie){
        let modalDiv = document.getElementById('modal-content');
        modalDiv.innerHTML = ""
    
        let box = document.createElement('div');
        let media = document.createElement('article');
        let image = document.createElement('div');
        let figure = document.createElement('figure');
        let imgSrc = document.createElement("img");
        let mediaContent = document.createElement("div");
        let content = document.createElement("div");
        let title = document.createElement("h6");
        let textBlock = document.createElement("div");
        let text = document.createElement("p");
        let genreBlock = document.createElement("div");
        let genre = document.createElement("p");
        let nav = document.createElement("nav");

        let genreArray = []
        movie.genres.forEach(movieGenre =>{
            genreArray.push(movieGenre.name)
        })

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
        genre.className = "genre"
        if(movie.genres[0]['name']) {
            genre.innerHTML = genreArray.join(" - ")
        }

    
        nav.className = "level"
    
        figure.append(imgSrc)
        image.append(figure)
        content.append(title)
        textBlock.append(text)
        genreBlock.append(genre)
        content.append(textBlock, genreBlock)
        mediaContent.append(content)
        media.append(image, mediaContent, nav)
        box.append(media)
        modalDiv.append(box)
    }
}

