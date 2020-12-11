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