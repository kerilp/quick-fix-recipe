var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

function displayCard2(recipeObj) {
  var card = document.createElement("div");
  card.classList.add("card");

  var imgContainer = document.createElement("div");
  imgContainer.classList.add("pure-u-1-3", "container");

  var img = document.createElement("img");
  img.setAttribute("src", recipeObj.images);
  img.setAttribute("alt", recipeObj.names);
  img.classList.add("pure-img", "recipe-img");
  imgContainer.appendChild(img);

  var saveBtn = document.createElement("button");
  saveBtn.classList.add("pure-button", "save-button");
  saveBtn.textContent = "Save";
  imgContainer.appendChild(saveBtn);

  var recipeDiv = document.createElement("div");
  recipeDiv.classList.add("pure-u-2-3", "recipe-info");

  var title = document.createElement("h2");
  title.classList.add("recipe-name");
  title.textContent = recipeObj.names;
  recipeDiv.appendChild(title);

  var glass = document.createElement('h3');
  glass.textContent = "Glass:";
  recipeDiv.appendChild(glass);

  var glasstype = document.createElement("p");
  glasstype.textContent = recipeObj.glasses;
  recipeDiv.appendChild(glasstype);

  var ingredTitle = document.createElement("h3");
  ingredTitle.textContent = "Ingredients:";
  recipeDiv.appendChild(ingredTitle);

  var ingredList = document.createElement("ul");
  ingredList.classList.add("ingred-list");
  var ingredient = recipeObj.ingredients;
  for (var j = 0; j < ingredient.length; j++) {
    var cockTailIngredient = ingredient[j];
    var ingredientList = document.createElement("li");
    ingredientList.textContent = cockTailIngredient;
    ingredList.appendChild(ingredientList);
    //console.log(ingredientList)
  }
  recipeDiv.appendChild(ingredList);

  var prepTitle = document.createElement("h3");
  prepTitle.textContent = "Preparation:";
  recipeDiv.appendChild(prepTitle);

  var prepInstr = document.createElement("p");
  prepInstr.textContent = recipeObj.instructions;
  recipeDiv.appendChild(prepInstr);

  card.appendChild(imgContainer);
  card.appendChild(recipeDiv);
  resultContentEl.appendChild(card);
}

function searchDrinkApi(query) {
  //console.log(name);
  var endPoint = apiUrl + query;
  fetch(endPoint)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      resultTextEl.textContent = "Showing results for " + query;
      //console.log(data);
      if (data.drinks === null || !data.drinks.length) {
        // TODO: Return data instead of just logging
        console.log("No results found");
        resultTextEl.textContent = "No results for " + query;
        return;
      } else {
        resultContentEl.textContent = "";
        var drinks = data.drinks;
        for (var i = 0; i < drinks.length; i++) {
          var drink = drinks[i];
          var drinkImg = drink.strDrinkThumb;
          var drinkName = drink.strDrink;
          var glassType = drink.strGlass;
          var instruction = drink.strInstructions;
          var ingredients = [];
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
          var cockTails = {
            images: drinkImg,
            names: drinkName,
            ingredients: ingredients,
            glasses: glassType,
            instructions: instruction,
          };

          displayCard2(cockTails);
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}