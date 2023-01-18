//will need to update alcohol type with drinkSelection variable later
var something = "";
var drinkUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${something}`;
var recipeTitle = document.getElementById("drink-title");
var ingredientContainer = document.getElementById("drink-ingredients");

function getDrink() {
  // getting the value of the user's drink selection based on which radio button they picked
  drinkSelection = $("input[name=answer]:checked").val();
  // updating the API with the drink selection chosen by user
  var drinkUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drinkSelection}`;
  // }
  // we kicked this Async operation off right away
  fetch(drinkUrl)
    .then(function (response) {
      //  Conditional for the the response.status; checking to make sure the status is good
      if (response.status === 200) {
        //need to pass this information to the next .then
        //the first .then needs to complete before the next .then
        //.json() returns the json object and converts it to javascript object
        //in json the keys and values are both strings

        return response.json();
      } else {
        // if the status is not 200, then we throw an error
        throw new Error("Something went wrong");
      }
    })
    //the response object in javascript
    //we need to pull out the info we need from data- data is our js object
    .then(function (data) {
      //Randomizing the drink selection//
      var randomDrink = Math.floor(Math.random() * data.drinks.length);
      // the data returns a value idDrink and then we can use a new API endpoint to search by idDrink
      //set the random drink's ID into a variable
      idDrink = data.drinks[randomDrink].idDrink;
      drinkName = data.drinks[randomDrink].strDrink; //strDrink is taken from the data object
      drinkImg = data.drinks[randomDrink].strDrinkThumb; //grabs the drink image
      //new API endpoint where we can use drink's ID from the previous call
      var drinkByIdUrl =
        "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + idDrink;
      getIngredients(drinkByIdUrl);
    })
    // IF we have an ERROR in our API request (it get's handled here)
    .catch(function (error) {
      console.log(error);
    });
}
//need to get the Ingredients
function getIngredients(drinkByIdUrl) {
  fetch(drinkByIdUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      recipeTitle.textContent = data.drinks[0].strDrink;
      instructions = data.drinks[0].strInstructions;

      //need to get the ingredients and measurements from a different endpoint that has the drink ID
      //need to loop through the 16 ingredients and measurements
      //need to check if they are == null and break the loop if they are
      for (var i = 1; i < 16; i++) {
        ingredient = data.drinks[0]["strIngredient" + i];
        unit = data.drinks[0]["strMeasure" + i];

        // breakout condition
        if (ingredient == null) {
          break;
        }

        // adds image to the page
        var tempImage = document.getElementById("drink-image");
        tempImage.setAttribute("src", drinkImg);

        var newcontentContainer = document.createElement("div");
        newcontentContainer.setAttribute("class", "bingo");
        // dynamically create new elements with classes for styling
        var tempIngredientAmt = document.createElement("li");
        tempIngredientAmt.setAttribute("class", "ingredient-amount");
        tempIngredientAmt.textContent = unit;

        var tempIngredient = document.createElement("li");
        tempIngredient.setAttribute("class", "ingredient-item");
        tempIngredient.textContent = ingredient;
        //new paragraph element for the instructions
        var tempInstructions = document.getElementById("instructions");
        tempInstructions.textContent = instructions;

        // once the new elements are created we have to add them to the DOM
        newcontentContainer.append(tempIngredientAmt, tempIngredient);
        ingredientContainer.append(newcontentContainer);
      }
    });
}

//add click event to the functions but not sure which one? getDrink or getIngredients?
var drinkButton = document.getElementById("cocktail");
drinkButton.addEventListener("click", getDrink);

// //local storage-previous searches
// // localStorage.setItem(key, value).JSON.stringify(recipeArray);
// // console.log(recipeArray);
