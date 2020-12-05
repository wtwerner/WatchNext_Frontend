document.addEventListener("DOMContentLoaded", function(){
    console.clear()

    const BACKEND_URL = 'http://localhost:3000';
    const TMDB_URL = 'https://api.themoviedb.org/3/';
    const IMG_URL = 'https://image.tmdb.org/t/p/w92';
    const TMDB_APPEND = '?api_key=462158256aa6d5d3eab60e67dcecfde2'
    
    const searchButton = document.querySelector('#search');
    const search = document.getElementById('movie-search');
    
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

            console.log(input);

            if (input) {
                console.log(input)
                fetchMovieData(input);
            }
            search.value = "";
        }
    }, false);

    function createMovieCard(movie) {
        let main = document.getElementById("main");
        let div = document.createElement("div");
        let pTag = document.createElement("p");
        let img = document.createElement("img");

        img.src = IMG_URL + movie.poster_path;
        div.className = "card";
        pTag.innerHTML = movie.title
    
        let watchedButton = document.createElement("button")
        watchedButton.id = "button-watched"
        watchedButton.innerHTML = "Watched"
        watchedButton.className = "button is-small"

        let removeButton = document.createElement("button")
        removeButton.id = "button-remove"
        removeButton.innerHTML = "Remove"
        removeButton.className = "button is-small"
        
        div.appendChild(img)
        div.appendChild(pTag)
        div.appendChild(watchedButton)
        div.appendChild(removeButton)
        main.appendChild(div)
    }

    function createSearchCard(movie) {
        let main = document.getElementById("search-results");
        let div = document.createElement("div");
        let pTag = document.createElement("p");
        let img = document.createElement("img");

        img.src = IMG_URL + movie.poster_path;
        div.className = "card";
        pTag.innerHTML = movie.title
        
        let watchListButton = document.createElement("button")
        watchListButton.id = "button-add"
        watchListButton.innerHTML = "Add to watchlist"
        watchListButton.className = "button is-small"
        watchListButton.setAttribute("movie_id", movie.id)
        watchListButton.addEventListener('click', function(event) {
            addToWatchList(event.target.attributes.movie_id.value)
        })

        div.appendChild(img)
        div.appendChild(pTag)
        div.appendChild(watchListButton)
        main.appendChild(div)
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

    fetchMovies()
});
