var apiKey = "5f616c8e2c5382293b3d7dcabb39d79d";
var queryURL = "www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka";
var foodUrl =
  "https://api.edamam.com/api/recipes/v2?type=public&app_id=12caf7ad&app_key=5f616c8e2c5382293b3d7dcabb39d79d&random=true&cuisineType=";
//need to fill in what the cuisine type is

var ID = "12caf7ad";
var apiArray = [];
var recipeArray = [];
var button = document.querySelector('.button');
var foodImage =document.getElementById('food-image')


append
// food
//add click event
//add fetch syntax

// get checked value 
function getRecipe(event){
  event.preventDefault();
  getApi(foodUrl);
}
// overarching fucntion for when button is pressed that calls the other fucntions
// change to .on?
button.addEventListener("click", getRecipe)
// get api already randomizes recpie chocie on refresh FIGURE OUT HOW
//skipped the api array since it aleady randomizes a specific recipe
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
      // below is the functions we deciced on jsut added as code
      recipeArray.push(data.hits[0]);
    });
}
// getApi(foodUrl);

function checkHealthLabels(){};

function getRecipeLabel(){};
// image and source are both urls but diffrent locations
function getImage(){};

function getSource(){};

function getIngredients(){};








//drinks- same as above
//add click event

//vegetarian- possibly other dietary restrictions

//displaying the recipes on the page

//local storage-previous searches
