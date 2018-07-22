class UI{

    //Display all the drink categories
    displayCategories(){
        const categoryList = cocktail.getCategories()
        .then(categories => {
            const catList = categories.categories.drinks;

            //Append a first option without vale
            const firstOption = document.createElement('option');
            firstOption.textContent = '- Select -';
            firstOption.value='';
            document.querySelector('#search').appendChild(firstOption);

            //Append into the Select
            catList.forEach(category =>{
                const option = document.createElement('option');
                option.textContent = category.strCategory;
                option.value = category.strCategory.split(' ').join('_');
                document.querySelector('#search').appendChild(option);
            })
        })
    }

    //Displays cocktails without ingredients
    displayDrinks(drinks){

        //  Show the Results
        const resultsWrapper = document.querySelector('.results-container');
        resultsWrapper.style.display = 'inline-block';
        // Insert the results
        const resultsDiv = document.querySelector('#results');

        //  Loop through drinks

        drinks.forEach(drink => {
            resultsDiv.innerHTML += `
                <div class="card">
                    <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                    <div class="card-body">
                        <h2 class="class-title text-center">${drink.strDrink}</h2>
                    </div>
                    <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">
                        Favorite
                        </button>
                        <a data-target="#recipe" class="btn btn-success get-recipe" href="#recipe" rel="modal:open" data-id="${drink.idDrink}">Get Recipe</a>
                </div>
            `;
        })
        this.isFavorite();
    }

    

    //Prints the ingredients and measurements
    displayIngredients(drink){
        let ingredients = [];
        for(let i=1; i < 16; i++){
            const ingredientMeasure = {};
            if(drink[`strIngredient${i}`] !== ''){
                ingredientMeasure.ingrediant = drink[`strIngredient${i}`];
                ingredientMeasure.measure = drink[`strMeasure${i}`];
                ingredients.push(ingredientMeasure);
            }   
        }
        //console.log(ingredients);
        //Build the template

        let ingrediantsTemplate = '';
        ingredients.forEach(ingrediant =>{
            ingrediantsTemplate += `
                <li class="list-group-item" >${ingrediant.ingrediant} - ${ingrediant.measure}</li>
            `;
        });

        return ingrediantsTemplate;
    }

    //Display Single Recipe
    displaySingleRecipe(recipe){

        //Get variable
        const modalTitle = document.querySelector(".modal-title"),
              modalDescription = document.querySelector(".modal-text .description-text"),
              modalIngrediants = document.querySelector(".modal-text .ingredient-list .list-group");

        //set the valiues
        modalTitle.innerHTML = recipe.strDrink;
        modalDescription.innerHTML = recipe.strInstructions;

        //Display Ingredient
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
        const reference = document.querySelector('h1');
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
                    <a href="#recipe" rel="modal:open" data-target="#recipe" data-id="${drink.id}" class="btn btn-success get-recipe">
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
                favoriteDrink.textContent = 'Remove';
            }
        })
    }

}