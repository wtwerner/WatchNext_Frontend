document.addEventListener("DOMContentLoaded", function(event){
    console.clear()

    const BACKEND_URL = 'http://localhost:3000';
    const TMDB_URL = 'https://api.themoviedb.org/3/movie/';
    const IMG_URL = 'https://image.tmdb.org/t/p/w200';
    const TMDB_APPEND = '?api_key=462158256aa6d5d3eab60e67dcecfde2'


    const form = document.getElementById('form');
    const search = document.getElementById('movie-search');
    
    form.addEventListener('click', function(event) {
        event.preventDefault();

        let input = search.value;

        console.log(input);
        search.value = '';

        if (input) {
            fetchMovieData(TMDB_URL + input);
            search.value = "";
        }
    }, false);

    function showSearchedMovies() {

    }

    function createMovieCard(movie) {
        let main = document.getElementById("main");
        let div = document.createElement("div");
        let pTag = document.createElement("p");
        let img = document.createElement("img");
        //add real image source
        img.src = IMG_URL + movie.poster_path;
        div.className = "card";
        pTag.innerHTML = movie.title
    
        let watchedButton = document.createElement("button")
        watchedButton.innerHTML = "Watched"
        watchedButton.className = "button is-small"

        let removeButton = document.createElement("button")
        removeButton.innerHTML = "Remove"
        removeButton.className = "button is-small"
        
        div.appendChild(img)
        div.appendChild(pTag)
        div.appendChild(watchedButton)
        div.appendChild(removeButton)
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
        return fetch(TMDB_URL+movie.attributes.tmdb_id+TMDB_APPEND)
        .then(function(response) {
            return response.json()
        })
        .then(function(json) {
            createMovieCard(json)
        })
    }

    fetchMovies()
});


// enter search query
// click submit
// query sent to fetch movie data search API call
// recieve json back
// create cards in search results area
// 
