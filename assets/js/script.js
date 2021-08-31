// this file takes in search criteria from landing page
// then switches to search-results

var searchEl = document.querySelector('#search-form');

function formSubmit(event) {
    event.preventDefault();

    var input = document.querySelector('#search-input');
    var criteria = document.querySelector('#search-criteria');

    var queryString = './search-results.html?q=' + input + '&criteria=' + criteria;

    location.assign(queryString);
}

searchEl.addEventListener('submit', formSubmit);