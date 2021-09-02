var searchEl = document.querySelector('#search-form');
var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#display-results');

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
    saveBtn.textContent = 'Save';
    imgContainer.appendChild(saveBtn);

    var recipeDiv = document.createElement('div');
    recipeDiv.classList.add('pure-u-2-3', 'recipe-info');

    var title = document.createElement('h2');
    title.classList.add('recipe-name');
    title.textContent = recipeObj.name;
    recipeDiv.appendChild(title);

    var ingredTitle = document.createElement('h3');
    ingredTitle.classList.add('ingred-title');
    ingredTitle.textContent = 'Ingredients:';
    recipeDiv.appendChild(ingredTitle);

    var ingredList = document.createElement('ul');
    ingredList.classList.add('ingred-list');
    for (var i = 0; i < recipeObj.ingred.length; i++) {
        var item = document.createElement('li');
        item.textContent = '• ' + recipeObj.ingred[i];
        ingredList.appendChild(item);
    }
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

            resultTextEl.textContent = 'Showing results for ' + query;

            if (data.meals === null || !data.meals.length) {
                console.log('No results found');
                resultTextEl.textContent = 'No results for ' + query;
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