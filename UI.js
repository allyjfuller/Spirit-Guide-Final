class UI{

	// Displays cocktails without ingredients

	displayDrinks(drinks){

		// Show the results
		const resultsContainer = document.querySelector('.results-container');
		resultsContainer.style.display = 'inline-block';

		// Insert the results
		const resultsDiv = document.querySelector('#results');

		// Loop through drinks
		drinks.forEach(drink => {
			resultsDiv.innerHTML += `
			<div class="three-column">
				<div class="card">
					<img class="card-img" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
						<div class="card-body">
							<h2 class="drink-title">${drink.strDrink}</h2>
							<a aria-controls="#recipe" class="btn get-recipe" href="#" data-toggle="modal" data-id="${drink.idDrink}">Get Recipe</a>
							<button type="button" data-id="${drink.idDrink}" class="favorite-btn btn">Favorite</button>
						</div>
					</div>
				</div>
			`;
		})
		this.isFavorite();
	}

	// Displays drinks with ingredients
	displayDrinksWithIngredients(drinks){

		// Show the results
		const resultsContainer = document.querySelector('.results-container');
		resultsContainer.style.display = 'inline-block';

		// Insert the results
		const resultsDiv = document.querySelector('#results');
        drinks.forEach(drink =>{
            resultsDiv.innerHTML += `
            <div class="three-column">
            	<div class="card">
            		<img class="card-img" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
            			<div class="card-body">
							<h2 class="drink-title">${drink.strDrink}</h2>
								<p class="instructions-list">Instructions:</p>
                            	<p class="card-text">
                                ${drink.strInstructions}</p>
                            	<p class="card-text">
                                <ul class="instructions-list">
                                    <li class="ingredient-list">Ingredients:</li>
                                    ${this.displayIngredients(drink)}
                                </ul>
                            	</p>
                            <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn">Favorite</button>
                        </div>
                    </div>
                </div>
            `;
		})
		this.isFavorites();
}

// Prints the ingredients and measurements
displayIngredients(drink){
	let ingredients = [];
	for(let i=1; i < 16; i++){
		const ingredientMeasure = {};
		if(drink[`strIngredient${i}`] !== ''){
			ingredientMeasure.ingrediant = drink[`strIngredient${i}`];
                ingredientMeasure.measure = drink[`strMeasure${i}`];
                ingredients.push(ingredientMeasure);
            }


// console.log(ingredients);
// Build the template

let ingrediantsTemplate = '';
        ingredients.forEach(ingrediant =>{
            ingrediantsTemplate += `
                <li class="instructions-list" >${ingrediant.ingrediant} • ${ingrediant.measure}</li>
            `;
        });

return ingrediantsTemplate;

}

// Display Single Recipe
    displaySingleRecipe(recipe){

        // Get variable
        const modalTitle = document.querySelector(".modal-title"),
              modalDescription = document.querySelector(".modal-text .drink-title"),
              modalIngrediants = document.querySelector(".modal-text .instructions-list .ingredient-list");

        // set the values
        modalTitle.innerHTML = recipe.strDrink;
        modalDescription.innerHTML = recipe.strInstructions;

        // Display Ingredient
        let ingredientsList = this.displayIngredients(recipe);
        modalIngrediants.innerHTML = ingredientsList;
    }
//Displays a Custom Message
    printMessage(message, className){
        const div = document.createElement('div');

        // Add the HTML
        div.innerHTML = `
            <div class="alert alert-dismissible alert-${className}">
                <button type="button" class="close" data-dismiss="alert">x</button>
                ${message}
            </div>
        `;

        //Insert before
        const reference = document.querySelector('.jumbotron h1');
        const parentNode = reference.parentElement;
        parentNode.insertBefore(div, reference);

        //remove after 3 seconds
        setTimeout(()=>{
            document.querySelector('.alert').remove();
        }, 3000);
    }

    //Clear previous results
    clearResults(){
        const resultsDiv = document.querySelector('#results');
        resultsDiv.innerHTML = '';
    }

    //Displays favorites from storage
    displayFavorites(favorites){
        const favoritesTable = document.querySelector('#favorites tbody');

        favorites.forEach(drink => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>
                    <img src="${drink.image}" alt="${drink.name}" width=100>
                </td>
                <td>${drink.name}</td>
                <td>
                    <a href="#" data-toggle="modal" data-target="#recipe" data-id="${drink.id}" class="btn btn-success get-recipe">
                        View
                    </a>
                </td>
                <td>
                    <a href="#" data-id="${drink.id}" class="btn btn-danger remove-recipe">
                        Remove
                    </a>
                </td>
            `;

            favoritesTable.appendChild(tr);
        })
    }

    //Remove single favorite from DOM
    removeFavorite(element){
        element.remove();
    }

    //Add a class when cocktail is favorite
    isFavorite(){
        const drinks = cocktailDB.getFromDB();

        drinks.forEach( drink => {
            //destructuring the id

            let {id} = drink;

            //Select the favorites
            let favoriteDrink = document.querySelector(`[data-id="${id}"]`);
            if(favoriteDrink){
                favoriteDrink.classList.add('is-favorite');
                favoriteDrink.textContent = '-';
            }
        })
    }

}
















