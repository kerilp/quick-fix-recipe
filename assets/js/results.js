var searchEl = document.querySelector('#search-form');
var randomBtnEl = document.querySelector('#randomizer');
var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#display-results');
var saveBtnEl = document.querySelector('.save-button');
var savedRecipes = localStorage.getItem('savedRecipes') || [];
localStorage.setItem('savedRecipes', savedRecipes);

function getParams() {
    var searchParams = document.location.search.split('&');
    var query = searchParams[0].split('=').pop();
    var criteria = searchParams[1].split('=').pop();

    if (criteria === 'food') {
        // run food api fetch request
        searchMealApi(query);
    }
    if (criteria === 'drink') {
        // run drink api fetch request
        searchDrinkApi(query);
    }
}

function displayCard(recipeObj) {
    var card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('id', recipeObj.id);

    var imgContainer = document.createElement('div');
    imgContainer.classList.add('pure-u-1-3', 'container');

    var img = document.createElement('img');
    img.setAttribute('src', recipeObj.image);
    img.setAttribute('alt', recipeObj.name);
    img.classList.add('pure-img', 'recipe-img');
    imgContainer.appendChild(img);

    var saveBtn = document.createElement('button');
    saveBtn.classList.add('pure-button', 'save-button');
    saveBtn.setAttribute('save-id', recipeObj.id);
    if(localStorage.getItem('savedRecipes').includes(recipeObj.id)) {
        saveBtn.classList.add('saved');
        saveBtn.textContent = '★';
    } else {
        saveBtn.textContent = '☆';
    }
    imgContainer.appendChild(saveBtn);

    var recipeDiv = document.createElement('div');
    recipeDiv.classList.add('pure-u-2-3', 'recipe-info');

    var title = document.createElement('h2');
    title.classList.add('recipe-name');
    title.textContent = recipeObj.name;
    recipeDiv.appendChild(title);

    var ingredTitle = document.createElement('h3');
    ingredTitle.textContent = 'Ingredients:';
    
    var ingredList = document.createElement('ul');
    ingredList.classList.add('ingred-list');
    for (var i = 0; i < recipeObj.ingred.length; i++) {
        var item = document.createElement('li');
        item.textContent = '• ' + recipeObj.ingred[i];
        ingredList.appendChild(item);
    }
    
    if(recipeObj.glass) {
        var glass = document.createElement('h3');
        glass.classList.add('title-underline');
        glass.textContent = 'Type of Glass: ' + recipeObj.glass;
        recipeDiv.appendChild(glass);
    } else {
        ingredTitle.classList.add('title-underline');
    }
    recipeDiv.appendChild(ingredTitle);
    recipeDiv.appendChild(ingredList);
    
    var prepTitle = document.createElement('h3');
    prepTitle.textContent = 'Preparation:';
    recipeDiv.appendChild(prepTitle);

    var prepInstr = document.createElement('p');
    prepInstr.textContent = recipeObj.instr;
    recipeDiv.appendChild(prepInstr);

    var tags = document.createElement('ul');
    tags.classList.add('tags');
    for (var i = 0; i < recipeObj.tags.length; i++) {
        var tag = document.createElement('li');
        tag.textContent = '#' + recipeObj.tags[i];
        tags.appendChild(tag);
    }
    recipeDiv.appendChild(tags);

    card.appendChild(imgContainer);
    card.appendChild(recipeDiv);
    resultContentEl.appendChild(card);
}

function searchMealApi(query) {
    var mealUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    mealUrl = mealUrl + query;

    fetch(mealUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var searchTerm = query.replace("%20", " ");
            resultTextEl.textContent = 'Showing results for ' + searchTerm;

            if (data.meals === null || !data.meals.length) {
                console.log('No results found');
                resultTextEl.textContent = 'No results for ' + searchTerm;
                return;
            } else {
                resultContentEl.textContent = '';
                for (var i = 0; i < data.meals.length; i++) {
                    var resultMeal = data.meals[i];
                    var recipeId = resultMeal.idMeal;
                    var recipeName = resultMeal.strMeal;
                    var recipeImgSrc = resultMeal.strMealThumb;
                    var instructions = resultMeal.strInstructions;
                    var ingredArr = [];
                    for (var j = 1; j <= 20; j++) {
                        var ingredient = resultMeal['strIngredient' + j];
                        if (ingredient) {
                            var measure = resultMeal['strMeasure' + j];
                            if (measure) {
                                ingredArr.push(measure.trim() + ' ' + ingredient.trim());
                            } else {
                                ingredArr.push(ingredient);
                            }
                        }
                    }
                    var tagsArr = [];
                    if(resultMeal.strCategory) {
                        tagsArr.push(resultMeal.strCategory);
                    }
                    if(resultMeal.strArea) {
                        tagsArr.push(resultMeal.strArea);
                    }
                    if(resultMeal.strTags) {
                        tagsArr.push(resultMeal.strTags);
                    }

                    var mealObj = {
                        id: recipeId,
                        name: recipeName,
                        image: recipeImgSrc,
                        ingred: ingredArr,
                        instr: instructions,
                        tags: tagsArr
                    }

                    displayCard(mealObj);
                }
            }
        })
        .catch(function (error) {
            console.error(error);
        });
}

function randomRecipe(event) {
    event.preventDefault();
    var random = Math.floor(Math.random() * 2) + 1;
    if(random === 1) {
        // food
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
        //drink
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

    if (!input || !criteria) {
        // displays modal telling user they must enter a search term
        console.error('No search criteria entered');
        return;
    }
    var queryString = './search-results.html?q=' + input + '&criteria=' + criteria;
    location.assign(queryString);

    resultContentEl.textContent = '';
    getParams();
}

getParams();
searchEl.addEventListener('submit', formSubmit);
randomBtnEl.addEventListener('click', randomRecipe);
resultContentEl.addEventListener('click', function(event){
    event.preventDefault();

    if(event.target.matches('button')){
        
        var savedCard = event.target.getAttribute('save-id');
        if(event.target.classList.contains('saved')) {
            event.target.classList.remove('saved');
            event.target.textContent = '☆';
            savedRecipes = JSON.parse(localStorage.getItem("savedRecipes"));
            for(var i = 0; i < savedRecipes.length; i++) {
                if (savedRecipes[i] === savedCard) {
                    savedRecipes.splice(i, 1);
                }
            }
            localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
            return;
        } else {
            event.target.classList.add('saved');
            event.target.textContent = '★';
            
            console.log(savedCard);
    
            if(localStorage.getItem("savedRecipes")) {
                savedRecipes = JSON.parse(localStorage.getItem("savedRecipes"));
            }
            if(!savedRecipes.includes(savedCard)) {
                savedRecipes.push(savedCard);
                localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
            }
        }
    }
});