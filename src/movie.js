class Movie {
    constructor(title, release_date, poster_path, tmdb_id, watched, to_watch){
        this.title = title;
        this.release_date = release_date;
        this.poster_path = poster_path;
        this.tmdb_id = tmdb_id;
        this.watched = watched;
        this.to_watch = to_watch;
    }

    createCard(){
        let card = new Card(this)
        if(this.to_watch = true){
            card.createWatchListCard()
        } else if(this.watched = true){
            card.createWatchedCard()
        } else {
            card.createSearchCard()
        }
    }

    addToWatchList(){
        fetch(BACKEND_URL+`/movies`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },

            body: JSON.stringify({
                "tmdb_id": this.tmdb_id,
                "to_watch": true,
                "watched": false
            })
        })
        .then (response => response.json())
        .then (json => {
            fetchMovieData(json['data'])
        })
    }

    moveToWatched(){
        fetch(BACKEND_URL+`/movies/${this.tmdb_id}`, {
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
            fetchMovieData(json['data'][0])
        })
        .then (removeCard(this.tmdb_id))
    }

    removeFromWatchList(){
        fetch(BACKEND_URL+`/movies/${this.tmdb_id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },

            body: JSON.stringify({
                "tmdb_id": this.tmdb_id
            })
        })
        .then (removeCard(this.tmdb_id))
    }
}

function createMovie(userMovieData, apiMovieData){
    return new Movie(
        apiMovieData.title,
        apiMovieData.release_date,
        apiMovieData.poster_path,
        userMovieData.attributes.tmdb_id,
        userMovieData.attributes.watched,
        userMovieData.attributes.to_watch
    )
}