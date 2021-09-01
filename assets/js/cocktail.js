var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
var searchByName;

var formEl = document.querySelector("#drink-input");
var displayEl = document.querySelector("#display");
var buttonEl = document.querySelector("#btn");

function clickHandler(event) {
  event.preventDefault();

  var drinkName = formEl.value;
  if (drinkName) {
    searchByName = drinkName;
    searchDrinkApi(searchByName);
  }
}

function searchDrinkApi(name) {
  console.log(name);
  var endPoint = apiUrl + name;
  fetch(endPoint)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.drinks===null) {
        // TODO: Return data instead of just logging
        console.log("No results found");
        return;
      }
      var drinks = data.drinks;
      // strInstructions strTags strIngredient[7] strMeasure1[7] strGlass
      for (var i = 0; i < drinks.length; i++) {
        var drink = drinks[i];
        var drinkImg = drink.strDrinkThumb;
        var ingredients = [];

        // Add ingredients to array
        for (var j = 1; j <= 15; j++) {
          var ingredient = drink["strIngredient" + j];
          if (ingredient !== null) {
            const measure = drink["strMeasure" + j];
            if (measure !== null) {
              ingredients.push(measure.trim() + " " + ingredient.trim());
            } else {
              ingredients.push(ingredient);
            }
          }
        }

        var glassType = drink.strGlass;
        var instruction = drink.strInstructions;
        var ulEl = document.createElement("ul");

        for (var j = 0; j < ingredients.length; j++) {
          var ingredient = ingredients[j];
          var ingredientList = document.createElement("li");
          ingredientList.textContent = ingredient;
          ulEl.appendChild(ingredientList);
        }

        var pEl = document.createElement("p");
        pEl.innerHTML = "Type of Glass to Use: " + glassType;
        var pEl2 = document.createElement("p");
        pEl2.textContent = "Instructions: " + instruction;
        var imgEl = document.createElement("img");
        imgEl.src = drinkImg;
        imgEl.setAttribute("style", "width:200px; height:200px");
        displayEl.appendChild(imgEl);
        displayEl.appendChild(pEl);
        displayEl.appendChild(ulEl);
        displayEl.appendChild(pEl2);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

//buttonEl.addEventListener("click", clickHandler);
