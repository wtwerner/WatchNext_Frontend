class Movie {
    constructor(apiMovieData, card = null) {
        this.title = apiMovieData.title;
        this.release_date = apiMovieData.release_date;
        this.poster_path = apiMovieData.poster_path;
        this.card = card
    }
}

class UserMovie extends Movie{
    constructor(userMovieData, apiMovieData){
        super(apiMovieData);
        this.tmdb_id = userMovieData.attributes.tmdb_id;
        this.watched = userMovieData.attributes.watched;
        this.to_watch = userMovieData.attributes.to_watch;
    }

    createCard(){
        this.card = new Card(this)
        if(this.to_watch === true){
            this.card.createWatchListCard()
            console.log(this)
        } else {
            this.card.createWatchedCard()
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
        .then (this.card.removeCard())
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