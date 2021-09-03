var searchEl = document.querySelector('#search-form');
var randomBtnEl = document.querySelector('#randomizer');

function randomRecipe(event) {
    event.preventDefault();
    var random = Math.floor(Math.random() * 2) + 1;
    if(random === 1) {
        // food api fetch
        var randomMeal = 'https://www.themealdb.com/api/json/v1/1/random.php';
        fetch(randomMeal)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var input = data.meals[0].strMeal;
            var criteria = 'food';
            var queryString = './search-results.html?q=' + input + '&criteria=' + criteria;
            location.assign(queryString);
        })
        .catch(function (error) {
            console.error(error);
        });
    } else {
        //drink api fetch
        var randomDrink = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
        fetch(randomDrink)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var input = data.drinks[0].strDrink;
            var criteria = 'drink';
            var queryString = './search-results.html?q=' + input + '&criteria=' + criteria;
            location.assign(queryString);
        })
        .catch(function (error) {
            console.error(error);
        });
    }
}

function formSubmit(event) {
    event.preventDefault();

    var input = document.querySelector('#search-input').value;
    var criteria = document.querySelector('#search-criteria').value;

    if(!input || !criteria) {
        return;
    }
    var queryString = './search-results.html?q=' + input + '&criteria=' + criteria;
    location.assign(queryString);
}

searchEl.addEventListener('submit', formSubmit);
randomBtnEl.addEventListener('click', randomRecipe);