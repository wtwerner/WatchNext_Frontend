document.addEventListener("DOMContentLoaded", function(event){
    console.clear()

    const BACKEND_URL = 'http://localhost:3000';
    const TMDB_URL = 'https://api.themoviedb.org/3/search/movie?&api_key=462158256aa6d5d3eab60e67dcecfde2&query="';

    const form = document.getElementById('form');
    const search = document.getElementById('movie-search');

    form.addEventListener('click', function(event) {
        event.preventDefault();

        let input = search.value;

        console.log(input);
        search.value = '';

        // if (input) {
        //     showMovies(TMDB_URL + input);
        //     search.value = "";
        // }
    }, false);

    function fetchMovies() {
        fetch(`${BACKEND_URL}/movies`)
        .then(response => response.json())
        .then(parsedResponse => console.log(parsedResponse));
    }

    fetchMovies()
});