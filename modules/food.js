const apiKey = 'e32b025b732b4d10ac72e64ddadf353d'; // API KEY
const predefinedCuisines = ['Chinese', 'French', 'Greek', 'Indian', 'Italian', 'Japanese', 'Mediterranean', 'Mexican', 'Spanish', 'Thai']; // API was originally built for cuisine, not Country.  If the country they enter doesn't work, this will eventually show up instead.

// Main function
export function getCuisines() {
    const country = document.getElementById('countryInput').value;
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${country}&number=5&addRecipeInformation=true&apiKey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.results.length === 0) {
                displayCuisines(predefinedCuisines);
            } else {
                displayRecipes(data.results);
            }
        })
        .catch(error => console.error('Error:', error));
}

// Displays the recipes if the function finds them in the API
function displayRecipes(recipes) {
    const recipeList = document.getElementById('recipeList');
    const recipeImage = document.getElementById('recipeImage');
    const imageTitle = document.getElementById('imageTitle');
    const cuisineList = document.getElementById('cuisineList');
    recipeList.innerHTML = '';
    cuisineList.style.display = 'none';
    recipeImage.style.display = 'none';
    imageTitle.textContent = '';

    if (recipes.length === 0) {
        recipeList.innerHTML = '<li>No recipes found. Please try another search.</li>';
        return;
    }

    recipes.forEach((recipe, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = recipe.title;
        listItem.dataset.image = recipe.image;
        listItem.dataset.title = recipe.title;
        listItem.addEventListener('click', () => {
            recipeImage.src = recipe.image;
            recipeImage.style.display = 'block';
            imageTitle.textContent = recipe.title;
        });

        recipeList.appendChild(listItem);

        // Create the initial image block
        if (index === 0) {
            recipeImage.src = recipe.image;
            recipeImage.style.display = 'block';
            imageTitle.textContent = recipe.title;
        }
    });
}

// Display the list of cuisines if a recipe isn't returned
function displayCuisines(cuisines) {
    const cuisineList = document.getElementById('cuisineList');
    const recipeList = document.getElementById('recipeList');
    cuisineList.innerHTML = '';
    recipeList.innerHTML = '';
    cuisineList.style.display = 'block';

    if (cuisines.length === 0) {
        cuisineList.innerHTML = '<li>No cuisines found. Please try another search.</li>';
        return;
    }

    // Make each cuisine clickable, which should return a new list of recipes
    cuisines.forEach(cuisine => {
        const listItem = document.createElement('li');
        listItem.textContent = cuisine;
        listItem.addEventListener('click', () => {
            fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${cuisine}&number=5&addRecipeInformation=true&apiKey=${apiKey}`)
                .then(response => response.json())
                .then(data => displayRecipes(data.results))
                .catch(error => console.error('Error:', error));
        });

        cuisineList.appendChild(listItem);
    });
}

export { displayRecipes, displayCuisines };
