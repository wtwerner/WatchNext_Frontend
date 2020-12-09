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
        if(movie.attributes.to_watch === true) {
            return fetch(TMDB_URL+'movie/'+movie.attributes.tmdb_id+TMDB_APPEND)
            .then(function(response) {
                return response.json()
            })
            .then(function(json) {
                createMovieCard(json)
            })
        } else {
            return fetch(TMDB_URL+'movie/'+movie.attributes.tmdb_id+TMDB_APPEND)
            .then(function(response) {
                return response.json()
            })
            .then(function(json) {
                createWatchedCard(json)
            })
        }
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