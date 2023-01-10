var apiKey = "5f616c8e2c5382293b3d7dcabb39d79d";
var queryURL = "www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka";
var foodUrl =
  "https://api.edamam.com/api/recipes/v2?type=public&app_id=12caf7ad&app_key=5f616c8e2c5382293b3d7dcabb39d79d&random=true&cuisineType=";
//need to fill in what the cuisine type is

var ID = "12caf7ad";

// food
//add click event
//add fetch syntax
function getApi(foodUrl) {
  fetch(foodUrl + "American")
    .then(function (response) {
      //  Conditional for the the response.status. checking to make sure the status is good
      if (response.status !== 200) {
        // Place the response.status on the page.
        responseText.textContent = response.status;
      }
      return response.json();
    })
    .then(function (data) {
      // Make sure to look at the response in the console and read how 404 response is structured.
      console.log(data.hits[0].recipe.label);
      console.log(data); //when you start building the html in js
    });
}

getApi(foodUrl);
//drinks- same as above
//add click event

//vegetarian- possibly other dietary restrictions

//displaying the recipes on the page

//local storage-previous searches
