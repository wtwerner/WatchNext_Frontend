function createMovieCard(movie) {
    let main = document.getElementById("main");
    let column = document.createElement("div");
    let div = document.createElement("div");
    let imgDiv = document.createElement("div");
    let figure = document.createElement("figure");
    let content = document.createElement("div")
    let pTag = document.createElement("p");
    let img = document.createElement("img");
    let footer = document.createElement("footer")

    img.src = IMG_URL + movie.poster_path;
    imgDiv.className = "card-image";
    figure.className = "image is-2by3"
    figure.addEventListener('click', function(event) {
        window.open(`${MOVIE_URL+movie.id}`, '_blank');
    })

    content.className = "card-content"

    column.className = "column is-one-quarter";
    div.className = "card";
    div.id = movie.id;

    pTag.className = "title is-7"
    pTag.innerHTML = movie.title+" ("+movie.release_date.substring(0,4)+")";

    footer.className = "card-footer"

    let watchedLink = document.createElement("a")
    watchedLink.id = "button-watched"
    watchedLink.innerHTML = "Watched"
    watchedLink.className = "card-footer-item"
    watchedLink.setAttribute("movie_id", movie.id)
    watchedLink.addEventListener('click', function(event) {
        moveToWatched(event.target.attributes.movie_id.value)
    })

    let removeLink = document.createElement("a")
    removeLink.id = "button-remove"
    removeLink.innerHTML = "Remove"
    removeLink.className = "card-footer-item"
    removeLink.setAttribute("movie_id", movie.id)
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

function createWatchedCard(movie) {
    let main = document.getElementById("watched");
    let column = document.createElement("div");
    let div = document.createElement("div");
    let imgDiv = document.createElement("div");
    let figure = document.createElement("figure");
    let content = document.createElement("div")
    let pTag = document.createElement("p");
    let img = document.createElement("img");
    let footer = document.createElement("footer")

    img.src = IMG_URL + movie.poster_path;
    imgDiv.className = "card-image";
    figure.className = "image is-2by3"
    figure.addEventListener('click', function(event) {
        window.open(`${MOVIE_URL+movie.id}`, '_blank');
    })

    content.className = "card-content"

    column.className = "column is-one-quarter";
    div.className = "card";
    div.id = movie.id;

    pTag.className = "title is-7"
    pTag.innerHTML = movie.title+" ("+movie.release_date.substring(0,4)+")";

    footer.className = "card-footer"

    let watchedLink = document.createElement("a")
    watchedLink.id = "button-watched"
    watchedLink.innerHTML = "Watched"
    watchedLink.className = "card-footer-item has-text-danger"
    watchedLink.setAttribute("movie_id", movie.id)


    let removeLink = document.createElement("a")
    removeLink.id = "button-remove"
    removeLink.innerHTML = "Remove"
    removeLink.className = "card-footer-item"
    removeLink.setAttribute("movie_id", movie.id)
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

function createSearchCard(movie) {
    let main = document.getElementById("search-results");
    let column = document.createElement("div");
    let div = document.createElement("div");
    let imgDiv = document.createElement("div");
    let figure = document.createElement("figure");
    let content = document.createElement("div")
    let pTag = document.createElement("p");
    let img = document.createElement("img");
    let footer = document.createElement("footer");

    img.src = IMG_URL + movie.poster_path;
    imgDiv.className = "card-image";
    figure.className = "image is-2by3"
    figure.addEventListener('click', function(event) {
        window.open(`${MOVIE_URL+movie.id}`, '_blank');
    })

    content.className = "card-content"

    column.className = "column is-one-quarter";
    div.className = "card";
    div.id = movie.id;

    pTag.className = "title is-7"
    pTag.innerHTML = movie.title+" ("+movie.release_date.substring(0,4)+")";

    footer.className = "card-footer"
    
    let watchListButton = document.createElement("button")
    watchListButton.id = "button-add"
    watchListButton.innerHTML = "Add to watchlist"
    watchListButton.className = "button card-footer-item"
    watchListButton.setAttribute("movie_id", movie.id)
    watchListButton.addEventListener('click', function(event) {
        addToWatchList(event.target.attributes.movie_id.value);
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