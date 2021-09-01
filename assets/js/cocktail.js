var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
var searchByName;

var formEl = document.querySelector("#drink-input");
var displayEl = document.querySelector("#display");
var buttonEl = document.querySelector("#btn");

var cockTails = {
  images: [],
  names: [],
  ingredients: [],
  glasses: [],
  instructions: [],
};
console.log(cockTails);

function searchDrinkApi(name) {
  //console.log(name);
  var endPoint = apiUrl + name;
  fetch(endPoint)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //console.log(data);
      if (data.drinks === null) {
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
        var drinkName = drink.strDrink;
        var glassType = drink.strGlass;
        var instruction = drink.strInstructions;

        cockTails.images.push(drinkImg); //push image to global object
        cockTails.ingredients.push(ingredients); //push ingredient array to global object;
        cockTails.names.push(drinkName); //push name to global object;
        cockTails.glasses.push(glassType); //push glass type to global object;
        cockTails.instructions.push(instruction); //push instruction array to global object;

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
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    renderpage()
}

function renderpage(){
  for (var i = 0; i < cockTails.glasses.length; i++) {
    var imgEl = document.createElement("img");
    var pEl3 = document.createElement("h5");
    var pEl = document.createElement("p");
    var ulEl = document.createElement("ul");
    var pEl2 = document.createElement("p");

    var glass = cockTails.glasses[i];
    var instruction = cockTails.instructions[i];
    var cocktailName = cockTails.names[i];
    var image = cockTails.images[i];
    var ingredient = cockTails.ingredients[i]

    for (var  j= 0; j < ingredient.length; j++) {
      var cockTailIngredient = ingredient[j];
      var ingredientList = document.createElement("li");
      ingredientList.textContent = cockTailIngredient;
      ulEl.appendChild(ingredientList);
      //console.log(ingredientList)
    }
    
    imgEl.src = image;
    pEl3.innerHTML = cocktailName;
    pEl.innerHTML = "Type of Glass to Use: " + glass;
    pEl2.innerHTML = "Instructions: " + instruction;

    imgEl.setAttribute("style", "width:200px; height:200px");
    displayEl.appendChild(imgEl);
    displayEl.appendChild(pEl3);
    displayEl.appendChild(pEl);
    displayEl.appendChild(ulEl);
    displayEl.appendChild(pEl2);
}
}




  


