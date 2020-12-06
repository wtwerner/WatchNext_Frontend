document.addEventListener("DOMContentLoaded", function(){
    console.clear()

    const BACKEND_URL = 'http://localhost:3000';
    const TMDB_URL = 'https://api.themoviedb.org/3/';
    const IMG_URL = 'https://image.tmdb.org/t/p/w780';
    const TMDB_APPEND = '?api_key=462158256aa6d5d3eab60e67dcecfde2'
    
    const searchButton = document.querySelector('#search');
    const search = document.getElementById('movie-search');

    const watchListNavButton = document.getElementById('watchlist-nav');
    const searchNavButton = document.getElementById('search-nav');

    const watchListView = document.getElementById("watchlist-view")
    const searchView = document.getElementById("search-view")

    watchListNavButton.addEventListener('click', function(event) {
        event.preventDefault();
        searchView.hidden = true
        watchListView.hidden = false
    })

    searchNavButton.addEventListener('click', function(event) {
        event.preventDefault();
        searchView.hidden = false
        watchListView.hidden = true
    })

    searchButton.addEventListener('click', function(event) {
        event.preventDefault();
        const div = document.getElementById("search-results")
        div.innerHTML = ""
        let input = search.value;

        if (input) {
            fetchMovieData(input);
        }
        search.value = "";
    }, false);

    search.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const div = document.getElementById("search-results")
            div.innerHTML = ""
            let input = search.value;

            if (input) {
                fetchMovieData(input);
            }
            search.value = "";
        }
    }, false);

    function createMovieCard(movie) {
        let main = document.getElementById("main");
        let column = document.createElement("div");
        let div = document.createElement("div");
        let imgDiv = document.createElement("div");
        let figure = document.createElement("figure");
        let content = document.createElement("div")
        let pTag = document.createElement("p");
        let img = document.createElement("img");

        img.src = IMG_URL + movie.poster_path;
        imgDiv.className = "card-image";
        figure.className = "image is-2by3"

        content.className = "card-content"

        column.className = "column is-one-quarter";
        div.className = "card";
        div.id = movie.id;

        pTag.className = "title is-6"
        pTag.innerHTML = movie.title;
    
        let watchedButton = document.createElement("button")
        watchedButton.id = "button-watched"
        watchedButton.innerHTML = "Watched"
        watchedButton.className = "button is-small"

        let removeButton = document.createElement("button")
        removeButton.id = "button-remove"
        removeButton.innerHTML = "Remove"
        removeButton.className = "button is-small"
        removeButton.setAttribute("movie_id", movie.id)
        removeButton.addEventListener('click', function(event) {
            removeFromWatchList(event.target.attributes.movie_id.value)
        })
        
        imgDiv.appendChild(figure)
        figure.appendChild(img)
        content.appendChild(pTag)
        div.appendChild(imgDiv)
        div.appendChild(content)
        div.appendChild(watchedButton)
        div.appendChild(removeButton)
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

        img.src = IMG_URL + movie.poster_path;
        imgDiv.className = "card-image";
        figure.className = "image is-2by3"

        content.className = "card-content"

        column.className = "column is-one-quarter";
        div.className = "card";
        div.id = movie.id;

        pTag.className = "title is-6"
        pTag.innerHTML = movie.title;
        
        let watchListButton = document.createElement("button")
        watchListButton.id = "button-add"
        watchListButton.innerHTML = "Add to watchlist"
        watchListButton.className = "button is-small"
        watchListButton.setAttribute("movie_id", movie.id)
        watchListButton.addEventListener('click', function(event) {
            addToWatchList(event.target.attributes.movie_id.value)
        })

        imgDiv.appendChild(figure)
        figure.appendChild(img)
        content.appendChild(pTag)
        div.appendChild(imgDiv)
        div.appendChild(content)
        div.appendChild(watchListButton)
        column.appendChild(div)
        main.appendChild(column)
    }

    function fetchMovies() {
        return fetch(BACKEND_URL+'/movies')
        .then(function(response) {
            return response.json()
        })
        .then(function(json) {
            let movies = json['data']
            movies.forEach(movie => {
                fetchMovieData(movie)
            })
        })
    }

    function fetchMovieData(movie) { 
        if(!(typeof movie === 'string' || movie instanceof String)) {
            return fetch(TMDB_URL+'movie/'+movie.attributes.tmdb_id+TMDB_APPEND)
            .then(function(response) {
                return response.json()
            })
            .then(function(json) {
                createMovieCard(json)
            })
        } else {
            return fetch(TMDB_URL+'search/movie'+TMDB_APPEND+'&query='+movie)
            .then(function(response) {
                return response.json()
            })
            .then(function(json) {
                json.results.forEach(movie => {
                    createSearchCard(movie)
            })
        })
    }}

    function addToWatchList(id) {
        fetch(BACKEND_URL+`/movies`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },

            body: JSON.stringify({
                "tmdb_id": id,
                "to_watch": true,
                "watched": false
            })
        })
        .then (response => response.json())
        .then (json => {
            fetchMovieData(json['data'])
        })
    }

    function removeFromWatchList(id) {
        console.log(id)
        fetch(BACKEND_URL+`/movies/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },

            body: JSON.stringify({
                "tmdb_id": id
            })
        })
        .then (removeCard(id))
    }

    function removeCard(id) {
        let card = document.getElementById(id).parentElement
        card.remove()
    }

    fetchMovies()
    searchView.hidden = true
});



function showView(viewName) {
    document.querySelector('.view').hide();
    document.querySelector('#' + viewName).show();
}