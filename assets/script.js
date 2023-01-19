var apiKey = "5f616c8e2c5382293b3d7dcabb39d79d";
var queryURL = "www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka";
var foodUrl =
  "https://api.edamam.com/api/recipes/v2?type=public&app_id=12caf7ad&app_key=5f616c8e2c5382293b3d7dcabb39d79d&random=true&cuisineType=";
//need to fill in what the cuisine type is

// querry select all for food radio by name
// querry select all for drink radio by name
//loop through them after it  ex allraduis[i].checked
var ID = "12caf7ad";
var button = document.getElementById('food');
var foodImage =document.getElementById('food-image');
var foodTitle = document.getElementById('food-title');
var ingredientList = document.getElementById('food-ingredients')
var foodLink = document.getElementById('food recipe');

// get checked value CURRENTLY NOT IN USE/FUNCTIONAL
function getRecipe(event){
  event.preventDefault();
  var hideFood = document.getElementById("hideFood");
  hideFood.classList.remove("is-hidden");
  foodSelection = $("input[name=food]:checked").val();
  getApi(foodSelection);
};

// overarching fucntion for when button is pressed that calls the other fucntions
// change to .on?
button.addEventListener("click", getRecipe);
// get api already randomizes recpie chocie on refresh FIGURE OUT HOW
//skipped the api array since it aleady randomizes a specific recipe
function getApi(foodSelection) {
  fetch(foodUrl + foodSelection)
    .then(function (response) {
      //  Conditional for the the response.status. checking to make sure the status is good
      if (response.status !== 200) {
        // Place the response.status on the page.
        responseText.textContent = response.status;
      }
      return response.json();
    })
    .then(function(data) {
      var recipesArray =[];
      var recipeArray = [];
      // Make sure to look at the response in the console and read how 404 response is structured.
        console.log(data); //when you start building the html in js
      recipesArray.push(data.hits); // puts all 20 recipes into an array
      recipeArray.push(recipesArray[0][0]); //puts a single recipe into an array from the recipesArray
      // checkHealthLabels(recipeArray); //this checks to see if the recipe has the vegetarian health label with true or false
      //below is printing the value to the html
      var recipeLabel = recipeArray[0].recipe.label; //gets label of recipe
      foodTitle.textContent = recipeLabel;
      // below gets the small image url
      // RUGULAR and THUMBNAIL option to test out if small doesnt fit well (images.[insert size] each have their respective heights and widths too)
      var recipeImage = recipeArray[0].recipe.images.SMALL.url;
        foodImage.src = recipeImage; // could change the image ?????
      var recipeSource = recipeArray[0].recipe.url; // ulr to the recipe
        foodLink.href = recipeSource; // make it so that the link display in seperate window??
      var recipeIngredients = recipeArray[0].recipe.ingredientLines; //gets ingredients in the for of an array
        appendIngredients(recipeIngredients); //prints all the ingredient in a list to the html
    });
}

function appendIngredients(array){
  ingredientList.textContent = '';
  for(i=0; i<array.length;i++){
    var li = document.createElement('li');
    li.setAttribute('id','food-ingredient');
    li.textContent = array[i];
    ingredientList.appendChild(li);
  };
};

//local storage-previous searches
