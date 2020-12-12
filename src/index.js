console.clear()

const searchButton = document.querySelector('#search');
const search = document.getElementById('movie-search');

const watchListNavButton = document.getElementById('watchlist-nav');
const searchNavButton = document.getElementById('search-nav');
const watchedNavButton = document.getElementById("watched-nav");

const watchListView = document.getElementById("watchlist-view")
const searchView = document.getElementById("search-view")
const watchedView = document.getElementById("watched-view")

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

watchListNavButton.addEventListener('click', function(event) {
    event.preventDefault();
    searchView.hidden = true
    watchListView.hidden = false
    watchedView.hidden = true
})

searchNavButton.addEventListener('click', function(event) {
    event.preventDefault();
    searchView.hidden = false
    watchListView.hidden = true
    watchedView.hidden = true
})

watchedNavButton.addEventListener('click', function(event) {
    event.preventDefault();
    searchView.hidden = true
    watchListView.hidden = true
    watchedView.hidden = false
})

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

function fetchMovieData(movie){
    if(!(typeof movie === 'string' || movie instanceof String)) {
        let userMovieData = movie
        return fetch(TMDB_URL+'movie/'+movie.attributes.tmdb_id+TMDB_APPEND)
        .then(function(response) {
            return response.json()
        })
        .then(function(json) {
            let apiMovieData = json
            let newMovie = new UserMovie(userMovieData, apiMovieData)
            newMovie.createCard()
        })
    } else {
        return fetch(TMDB_URL+'search/movie'+TMDB_APPEND+'&query='+movie)
        .then(function(response) {
            return response.json()
        })
        .then(function(json) {
            json.results.forEach(movie => {
                let newMovie = new SearchMovie(movie)
                newMovie.createCard()
            })
        })
    }
}

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
    let card = document.querySelector(`[data-tmdbid="${id}"]`).parentElement
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
    .then (card.remove())
}

function moveToWatched(id){
    let card = document.querySelector(`[data-tmdbid="${id}"]`).parentElement
    fetch(BACKEND_URL+`/movies/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },

        body: JSON.stringify({
            "tmdb_id": this.tmdb_id,
            "watched": true,
            "to_watch": false
        })
    })
    .then (response => response.json())
    .then (json => {
        fetchMovieData(json['data'][0]['id'])
    })
    .then (card.remove())
}

searchView.hidden = true
watchedView.hidden = true
fetchMovies()