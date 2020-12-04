document.addEventListener("DOMContentLoaded", function(event){
    console.clear()

    const BACKEND_URL = 'http://localhost:3000';
    const TMDB_URL = 'https://api.themoviedb.org/3/search/movie?&api_key=462158256aa6d5d3eab60e67dcecfde2&query="'

    const form = document.getElementById("form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        main.innerHTML = '';
        
        const query = search.value;

        // if (query) {
        //     showMovies(TMDB_URL + query);
        //     search.value = "";
        // }
    });

    function fetchMovies() {
        fetch(`${BACKEND_URL}/movies`)
        .then(response => response.json())
        .then(parsedResponse => console.log(parsedResponse));
    }

    fetchMovies()
});