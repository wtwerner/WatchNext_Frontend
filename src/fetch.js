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
    let userMovieData = movie
    return fetch(TMDB_URL+'movie/'+movie.attributes.tmdb_id+TMDB_APPEND)
    .then(function(response) {
        return response.json()
    })
    .then(function(json) {
        let apiMovieData = json
        let newMovie = createMovie(userMovieData, apiMovieData)
        newMovie.createCard()
    })
}