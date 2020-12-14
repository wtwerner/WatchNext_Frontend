console.clear()

const searchButton = document.querySelector('#search');
const search = document.getElementById('movie-search');

const watchListNavButton = document.getElementById('watchlist-nav');
const searchNavButton = document.getElementById('search-nav');
const watchedNavButton = document.getElementById("watched-nav");

const watchListView = document.getElementById("watchlist-view")
const searchView = document.getElementById("search-view")
const watchedView = document.getElementById("watched-view")

searchButton.addEventListener('click', function(event) {
    event.preventDefault();
    const div = document.getElementById("search-results")
    div.innerHTML = ""
    let input = search.value;

    if (input) {
        searchMovie(input);
    }
    search.value = "";
}, false);

search.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const div = document.getElementById("search-results")
        div.innerHTML = ""
        let input = search.value;

        if (input) {
            searchMovie(input);
        }
        search.value = "";
    }
}, false);

watchListNavButton.addEventListener('click', function(event) {
    event.preventDefault();
    searchView.hidden = true
    watchListView.hidden = false
    watchedView.hidden = true
})

searchNavButton.addEventListener('click', function(event) {
    event.preventDefault();
    searchView.hidden = false
    watchListView.hidden = true
    watchedView.hidden = true
})

watchedNavButton.addEventListener('click', function(event) {
    event.preventDefault();
    searchView.hidden = true
    watchListView.hidden = true
    watchedView.hidden = false
})

searchView.hidden = true
watchedView.hidden = true
fetchMovies()
