class MovieCard {
    constructor(title, year, poster_path, tmdb_id, status){
        this.title = title,
        this.year = year,
        this.poster_path = poster_path,
        this.tmdb_id = tmdb_id,
        this.status = status
    }
}

class Genre {
    constructor(name, id){
        this.name = name,
        this.id = id
    }
}