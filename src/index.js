document.addEventListener("DOMContentLoaded", function(event){
    console.clear()

    const BACKEND_URL = 'http://localhost:3000';
    const TMDB_URL = 'https://api.themoviedb.org/3/search/movie?&api_key=462158256aa6d5d3eab60e67dcecfde2&query="';

    const form = document.getElementById('form');
    const search = document.getElementById('movie-search');

    
    form.addEventListener('click', function(event) {
        event.preventDefault();

        let input = search.value;

        console.log(input);
        search.value = '';

        // if (input) {
        //     showMovies(TMDB_URL + input);
        //     search.value = "";
        // }
    }, false);

    function createMovieCard(movie) {
        let main = document.getElementById("main")
        let div = document.createElement("div")
        let pTag = document.createElement("p")
        div.className = "card"
        pTag.innerHTML = movie.attributes.tmdb_id
    
        let watchedButton = document.createElement("button")
        watchedButton.innerHTML = "Watched"
        watchedButton.className = "button is-small"

        let removeButton = document.createElement("button")
        removeButton.innerHTML = "Remove"
        removeButton.className = "button is-small"
    
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
                createMovieCard(movie)
                console.log(movie)
            })
        })
    }

    fetchMovies()
});