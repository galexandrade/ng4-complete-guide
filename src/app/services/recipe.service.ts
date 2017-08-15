import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "app/recipes/recipe.model";
import { Ingredient } from "app/shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { Subject } from "rxjs/Subject";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

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

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    
    setRecipes(recipes: Recipe[]){
        this.recipes = recipes.slice();
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index, recipe: Recipe){
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}