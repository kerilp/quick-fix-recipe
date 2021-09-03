var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

function searchDrinkApi(query) {
  var endPoint = apiUrl + query;
  fetch(endPoint)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var searchTerm = query.replace(/%20/g, " ");
            resultTextEl.textContent = 'Showing results for ' + searchTerm;
      
      if (data.drinks === null || !data.drinks.length) {
        resultTextEl.textContent = 'No results for ' + searchTerm;
        return;
      } else {
        resultContentEl.textContent = "";

        for (var i = 0; i < data.drinks.length; i++) {
          var drink = data.drinks[i];
          var drinkImg = drink.strDrinkThumb;
          var drinkName = drink.strDrink;
          var glassType = drink.strGlass;
          var instruction = drink.strInstructions;
          var drinkId = drink.idDrink;
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

          var tagsArr = [];
          if (drink.strCategory){
            tagsArr.push(drink.strCategory)
          }
          if(drink.strAlcoholic){
            tagsArr.push(drink.strAlcoholic)
          }
          if(drink.strTags){
            tagsArr.push(drink.strTags)
          }
          var cockTails = {
            id: drinkId,
            name: drinkName,
            image: drinkImg,
            ingred: ingredients,
            glass: glassType,
            instr: instruction,
            tags: tagsArr,
          };

          displayCard(cockTails);
        }
      }
    });
}