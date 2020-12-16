function fetchMovies() {
    return fetch(BACKEND_URL+'/movies')
    .then(function(response) {
        return response.json()
    })
    .then(function(json) {
        let movies = json['data']
        movies.forEach(movie => {
            let m = new UserMovie(movie.attributes, parseInt(movie.id, 10))
            m.createCard()
        })
    })
}

function fetchModalData(id){
    return fetch(TMDB_URL+'movie/'+id+TMDB_APPEND)
    .then(function(response) {
        return response.json()
    })
    .then(function(json){
        let modalMovie = new SearchMovie(json)
        return modalMovie
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

function searchMovie(string){
    return fetch(TMDB_URL+'search/movie'+TMDB_APPEND+'&query='+string)
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

function fetchMovieData(id) {
    return fetch(TMDB_URL+'movie/'+id+TMDB_APPEND)
    .then(function(response) {
        return response.json()
    })
    .then(function(json) {
        let newMovie = new UserMovie(json)
        newMovie.watched = false
        newMovie.to_watch = true
        newMovie.createCard()
        createMovie(newMovie)
    })
}

function createMovie(movie) {
    fetch(BACKEND_URL+`/movies`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },

        body: JSON.stringify({
            "tmdb_id": movie.tmdb_id,
            "title": movie.title,
            "poster_path": movie.poster_path,
            "vote_average": movie.vote_average,
            "vote_count": movie.vote_count,
            "overview": movie.overview,
            "to_watch": movie.to_watch,
            "release_date": movie.release_date,
            "watched": movie.watched,
            "genres": movie.genres
        })
    })
    .then (response => response.json())
}

function createMovieGenres(genreID, movieID){
    fetch(BACKEND_URL+`/movie_genres`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },

        body: JSON.stringify({
            "genre_id": genreID,
            "movie_id": movieID
        })
    });
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
            "tmdb_id": id,
            "watched": true,
            "to_watch": false
        })
    })
    .then (response => response.json())
    .then (() => {
        card.querySelector('#button-watched').className = "card-footer-item has-text-danger"
        let destination = document.getElementById("watched")
        destination.appendChild(card)
    })
}