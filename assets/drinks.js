var something = "";
var drinkUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${something}`;
//will need to update alcohol type with drinkSelection variable later
//create vars for appending recipes later on
var recipeTitle = document.getElementById("recipe-title");
var ingredientContainer = document.getElementById("ingredients");
//console.log(recipeTitle)

function getDrink() {
  // Getting the value of the user's drink selection based on which radio button they picked
  drinkSelection = $("input[name=answer]:checked").val();
  console.log(drinkSelection);
  // adding drinkSelection to the drinkUrl
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
      console.log(data);
      //Randomizing the drink selection//
      var randomDrink = Math.floor(Math.random() * data.drinks.length);
      console.log(randomDrink);
      // the data returns a value idDrink and then we can use a new API endpoint to search by idDrink
      //set the random drink's ID into a variable
      //need to use ID and not drink name because of the underscore problem in the url
      idDrink = data.drinks[randomDrink].idDrink;
      console.log(idDrink);
      drinkName = data.drinks[randomDrink].strDrink; //stDrink taken from the data object
      console.log(drinkName);
      drinkImg = data.drinks[randomDrink].strDrinkThumb; //grabs the drink image

      //new API endpoint where you can use drink ID from the previous call
      var drinkByIdUrl =
        "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + idDrink;
      console.log(drinkByIdUrl);
      getIngredients(drinkByIdUrl);
    })
    // IF we have an ERROR in our API request (it gets handled here)
    .catch(function (error) {
      console.log(error);
    });
}
//need to get the Ingredients to append to the page
function getIngredients(drinkByIdUrl) {
  fetch(drinkByIdUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      recipeTitle.textContent = data.drinks[0].strDrink;

      //need to loop through the 15 possible ingredients and measurements
      //need to check if they are == null??
      for (var i = 1; i <= 15; i++) {
        ingredient = data.drinks[0]["strIngredient" + i];
        unit = data.drinks[0]["strMeasure" + i];
        console.log(ingredient, unit);
        // breakout condition
        if (ingredient == null) {
          console.log("Not more ingredients");
          break;
        }

        let newcontentContainer = document.createElement("div");
        newcontentContainer.setAttribute("class", "bingo");
        // dynamically create new elements with classes/id's data
        let tempIngredient = document.createElement("li");
        tempIngredient.setAttribute("class", "ingredient-item");
        tempIngredient.textContent = ingredient;

        let tempIngredientAmt = document.createElement("li");
        tempIngredientAmt.setAttribute("class", "ingredient-amount");
        tempIngredientAmt.textContent = unit;
        // tempIngredient.innerHTML = "<li>Ingredient: "

        console.log(tempIngredient);
        console.log(tempIngredientAmt);
        // once the new elements are created WE HAVE TO ADD THEM TO THE DOM/BROWSER
        newcontentContainer.append(tempIngredient, tempIngredientAmt);
        ingredientContainer.append(newcontentContainer);
      }
    });
}

//add click event to getDrink--need to double check on this
var drinkButton = document.getElementById("cocktail");
drinkButton.addEventListener("click", getDrink);

// //displaying the recipes on the page

// //local storage-previous searches
// // localStorage.setItem(key, value).JSON.stringify(recipeArray);
// // console.log(recipeArray);
