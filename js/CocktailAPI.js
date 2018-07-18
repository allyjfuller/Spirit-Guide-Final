//i just removed fetch for ajax
class CocktailAPI{

    // Get recipe by name
    async getDrinksByName(name){
        //Search by name
        const apiResponse = await $.getJSON(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);

        // Return a json response

        const cocktails = await apiResponse;

        return{
            cocktails
        }
    }


    //Get recipe by ingrediant
    async getDrinksByIngredient(ingredient){
        //Search by ingrediant
        const apiResponse = await $.getJSON(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);

        //Retuern a json response

        const cocktails = await apiResponse;

        return {
            cocktails
        }
    }

    //Get single recipe
    async getSingleRecipe(id){
        //Search by ingrediant
        const apiResponse = await $.getJSON(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);

        //Retuern a json response

        const recipe = await apiResponse;

        return {
            recipe
        }
    }

    //Retrieves all categories from REST API

    async getCategories(){
        const apiResponse = await $.getJSON('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');

        //wait for the response and return json

        const categories = await apiResponse;

        return{
            categories
        }
    }

    //Get Drinks by category
    async getDrinksByCategory(category){
        //Search by category
        const apiResponse = await $.getJSON(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);

        //Retuern a json response

        const cocktails = await apiResponse;

        return {
            cocktails
        }
    }


    //Get Drinks by Glassware
    async getDrinksByGlassware(glass){
        //Search by Glassware
        const apiResponse = await $.getJSON(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glass}`);

        //Return a json response

        const cocktails = await apiResponse;

        return {
            cocktails
        }
    }
}
