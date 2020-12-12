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

function fetchMovie(id) {
    return fetch(BACKEND_URL+'/movies/'+id)
    .then(function(response) {
        return response.json()
    })
    .then(function(json) {
        fetchMovieData(json['data'][0])
    })
}

function fetchMovieData(movie){
    if((typeof movie === 'string' || movie instanceof String)) {
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
    } else {
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
        fetchMovie(json['data'][0]['attributes']['tmdb_id'])
    })
    .then (card.remove())
}