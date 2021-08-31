//  gets parameters from the url (assigned in script.js)
//  contains fetch request for both apis
//  determines which one to use when either food or
//  drink is chosen in the dropdown box in the search form

var searchEl = document.querySelector('#search-form');
// for testing purposes only, will use document.location irl
var testUrl = './search-results.html?q=margarita&criteria=drink';

function getParams() {
    // var searchParams = document.location.search.split('&');
    var searchParams = testUrl.split('&');
    console.log(searchParams);

    var query = searchParams[0].split('=').pop();
    console.log(query);

    var criteria = searchParams[1].split('=').pop();
    console.log(criteria);

    if(criteria === 'food') {
        // run food api fetch request
        // searchMealApi(query);
    }
    if(criteria === 'drink') {
        // run drink api fetch request
        // searchDrinkApi(query);
    }
}

function formSubmit(event) {
    event.preventDefault();

    var input = document.querySelector('#search-input').value;
    var criteria = document.querySelector('#search-criteria').value;

    if(!input || !criteria) {
        // does not search
        // displays modal telling user they must enter a search term
    }

    if(criteria === 'food') {
        // run food api fetch request
        // searchMealApi(query);
    }
    if(criteria === 'drink') {
        // run drink api fetch request
        // searchDrinkApi(query);
    }
    
}

searchEl.addEventListener('submit', formSubmit);

getParams();