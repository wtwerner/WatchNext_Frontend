class Movie {
    constructor(apiMovieData, card = null) {
        this.title = apiMovieData.title;
        this.release_date = apiMovieData.release_date;
        this.poster_path = apiMovieData.poster_path;
        this.id = apiMovieData.id
        this.genres = apiMovieData.genres
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
        console.log(this)
        this.card = new Card(this)
        if(this.to_watch === true){
            this.card.createWatchListCard()
        } else {
            this.card.createWatchedCard()
        }
    }
}

class SearchMovie extends Movie {
    constructor(apiMovieData){
        super(apiMovieData)
    }

    createCard() {
        this.card = new Card(this)
        this.card.createSearchCard()
    }
}