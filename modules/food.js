const apiKey = 'e32b025b732b4d10ac72e64ddadf353d'; // API KEY
const predefinedCuisines = ['Chinese', 'French', 'Greek', 'Indian', 'Italian', 'Japanese', 'Mediterranean', 'Mexican', 'Spanish', 'Thai']; // API was originally built for cuisine, not Country.  If the country they enter doesn't work, this will eventually show up instead.
// Had to populate some predefined cuisines that will display if the countryInput doesn't return any.

// Main function
export function getCuisines() {
    const country = document.getElementById('countryInput').value;
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${country}&number=5&addRecipeInformation=true&apiKey=${apiKey}`;

    fetch(apiUrl)  // fetch date
        .then(response => response.json())  //convert to json
        .then(data => {
            if (data.results.length === 0) {  // if no results,  return the predefined cuisines from above
                displayCuisines(predefinedCuisines);
            } else {
                displayRecipes(data.results); // if results, display the recipes
            }
        })
        .catch(error => console.error('Error:', error));  //log errors
}

// Displays the recipes if the function finds them in the API
function displayRecipes(recipes) {
    const recipeList = document.getElementById('recipeList');  //get the list
    const recipeImage = document.getElementById('recipeImage'); // grab the image
    const imageTitle = document.getElementById('imageTitle');   // get the image title
    const cuisineList = document.getElementById('cuisineList'); // cuise list element
    recipeList.innerHTML = '';              //clear the current recipe list
    cuisineList.style.display = 'none';     // hide the cuisine list
    recipeImage.style.display = 'none';     // hide recipe image
    imageTitle.textContent = '';            //clear the image title

    if (recipes.length === 0) {   // this is a message to display if no recipes are found
        recipeList.innerHTML = '<li>No recipes found. Please try another search.</li>';
        return;
    }

    recipes.forEach((recipe, index) => {  //loop through recipes
        const listItem = document.createElement('li'); //create a list
        listItem.textContent = recipe.title;  //list item as the recipe title
        listItem.dataset.image = recipe.image;  //store the image
        listItem.dataset.title = recipe.title;  //store the title
        listItem.addEventListener('click', () => {  //add an event listener to listed items
            recipeImage.src = recipe.image;         //set the image 
            recipeImage.style.display = 'block';        //display the image in block
            imageTitle.textContent = recipe.title;  //set the image title
        });

        recipeList.appendChild(listItem);       //add list item to recipe list

        // Create the initial image block
        if (index === 0) {  
            recipeImage.src = recipe.image;
            recipeImage.style.display = 'block';
            imageTitle.textContent = recipe.title;  //set image title
        }
    });
}

// Display the list of cuisines if a recipe isn't returned
function displayCuisines(cuisines) {
    const cuisineList = document.getElementById('cuisineList'); //get cuisine list
    const recipeList = document.getElementById('recipeList');   // get recipe list
    cuisineList.innerHTML = '';     //clear cuisine list
    recipeList.innerHTML = '';      //clear recipe list
    cuisineList.style.display = 'block';  //display cuisine list

    if (cuisines.length === 0) {  //display if no cuisine found
        cuisineList.innerHTML = '<li>No cuisines found. Please try another search.</li>';
        return;
    }

    // Make each cuisine clickable, which should return a new list of recipes
    cuisines.forEach(cuisine => {
        const listItem = document.createElement('li');  //create list
        listItem.textContent = cuisine; //set list item text to cuisine name
        listItem.addEventListener('click', () => {  //add event listener
            fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${cuisine}&number=5&addRecipeInformation=true&apiKey=${apiKey}`)
                .then(response => response.json())  //fetch data from the API
                .then(data => displayRecipes(data.results))  //diplsy recipes
                .catch(error => console.error('Error:', error));  //log errors
        });

        cuisineList.appendChild(listItem); //add list item to cuisine list
    });
}

export { displayRecipes, displayCuisines };  //export functions
