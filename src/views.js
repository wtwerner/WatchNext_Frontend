const watchListNavButton = document.getElementById('watchlist-nav');
const searchNavButton = document.getElementById('search-nav');
const watchedNavButton = document.getElementById("watched-nav");

const watchListView = document.getElementById("watchlist-view")
const searchView = document.getElementById("search-view")
const watchedView = document.getElementById("watched-view")

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