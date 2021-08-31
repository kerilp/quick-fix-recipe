// this file takes in search criteria from landing page
// then switches to search-results

var searchEl = document.querySelector('#search-form');

function formSubmit(event) {
    event.preventDefault();

    var input = document.querySelector('#search-input').value;
    var criteria = document.querySelector('#search-criteria').value;

    if(!input || !criteria) {
        // does not search
        // displays modal telling user they must enter a search term
    }

    var queryString = './search-results.html?q=' + input + '&criteria=' + criteria;

    location.assign(queryString);
}

searchEl.addEventListener('submit', formSubmit);