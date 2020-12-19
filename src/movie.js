class Movie{
    constructor(movieData){
        this.title = movieData.title;
        this.overview = movieData.overview;
        this.poster_path = movieData.poster_path;
        this.release_date = movieData.release_date;
        this.vote_average = movieData.vote_average;
        this.vote_count = movieData.vote_count;
        if(movieData.tmdb_id){
            this.tmdb_id = movieData.tmdb_id;
        } else {
            this.tmdb_id = movieData.id;
        }
    }
}


class UserMovie extends Movie{
    constructor(movieData, id){
        super(movieData);
        this.watched = movieData.watched;
        this.to_watch = movieData.to_watch;
        this.genres = movieData.genres;
        this.db_id = id;
    }

    createCard(){
        this.card = new Card(this)
        if(this.to_watch === true){
            this.card.createWatchListCard(this.card.createCardDiv())
        } else {
            this.card.createWatchedCard(this.card.createCardDiv())
        }
    }
}

class SearchMovie extends Movie {
    constructor(movieData){
        super(movieData);
        this.genres = movieData.genre_ids
    }

    createCard() {
        this.card = new Card(this)
        this.card.createSearchCard(this.card.createCardDiv())
    }
}