//  gets parameters from the url (assigned in script.js)
//  contains fetch request for both apis
//  determines which one to use when either food or
//  drink is chosen in the dropdown box in the search form

var searchEl = document.querySelector('#search-form');

function getParams() {
    var searchParams = document.location.search.split('&');
    console.log(searchParams);

    var query = searchParams[0].split('=').pop();
    console.log(query);

    var criteria = searchParams[1].split('=').pop();
    console.log(criteria);

    if(criteria === 'food') {
        // run food api fetch request
        searchMealApi(query);
    }
    if(criteria === 'drink') {
        // run drink api fetch request
        // searchDrinkApi(query);
    }
}

function searchMealApi(query) {
    var mealUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    mealUrl = mealUrl + query;

    fetch(mealUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            //console.log(data);

            if(!data.meals.length) {
                console.log('No results found');
            }
            for(var i = 0; i < data.meals.length; i++) {

                var resultMeal = data.meals[i];

                var recipeName = resultMeal.strMeal;
                console.log(recipeName);
    
                var recipeImgSrc = resultMeal.strMealThumb;
                console.log(recipeImgSrc);
    
                var instr = resultMeal.strInstructions;
                console.log(instr);
    
                var ingredArr = [];
                for(var i = 1; i < 20; i++) {
                    var ingredID = 'strIngredient' + i;
                    var ingredient = resultMeal[ingredID];
                    if(ingredient) {
                        ingredArr.push(ingredient);
                    }
                }
                console.log(ingredArr);
    
                var measureArr = [];
                for(var i = 1; i < 20; i++) {
                    var measureID = 'strMeasure' + i;
                    var measurement = resultMeal[measureID];
                    if(measurement) {
                        measureArr.push(measurement);
                    }
                }
                console.log(measureArr);
            }

        })
        .catch(function (error) {
            console.error(error);
        });
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