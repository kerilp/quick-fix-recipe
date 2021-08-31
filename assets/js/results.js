// for testing purposes only, would use document.location irl
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
    }
    if(criteria === 'drink') {
        // run drink api fetch request
    }
}

getParams();