import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "app/recipes/recipe.model";
import { Ingredient } from "app/shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";

@Injectable()
export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe('30-Minute Pressure Cooker Chicken...', 
                    'Tasty gooood...', 
                    'http://www.seriouseats.com/images/2015/09/20150914-pressure-cooker-recipes-roundup-09.jpg',
                    [new Ingredient('Bread', 5)]),
        new Recipe('Pressure Cooker French Onion Soup', 
                    'Tasty very gooood...', 
                    'http://www.seriouseats.com/images/2017/02/20170228-pressure-cooker-recipes-roundup-04.jpg',
                    [new Ingredient('Bread', 5)])
    ];

    constructor(private shoppingListService: ShoppingListService){

    }

    getRecipes(){
        //To get a coppy, not the instance
        return this.recipes.slice();
    }

    getRecipe(id: number){
        //To get a coppy, not the instance
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);
    }
}