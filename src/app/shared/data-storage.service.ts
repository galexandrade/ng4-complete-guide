import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { RecipeService } from "app/services/recipe.service";
import 'rxjs/Rx';
import { Recipe } from "app/recipes/recipe.model";
import { AuthService } from "app/auth/auth.service";

@Injectable()
export class DataStorage {
    constructor(private http: Http, 
                private recipeService: RecipeService, 
                private authService: AuthService){}

    storeRecipes(){
        const token = this.authService.getToken();
        return this.http.put("https://ng-recipe-book-d42fc.firebaseio.com/recipes.json?auth=" + token, this.recipeService.getRecipes());
    }

    fetchRecipes(){
        const token = this.authService.getToken();
        return this.http.get("https://ng-recipe-book-d42fc.firebaseio.com/recipes.json?auth=" + token)
            .map((response) => {
                const recipes: Recipe[] = response.json();
                recipes.forEach(recipe => {
                    if(!recipe.ingredients)
                        recipe.ingredients = [];
                });
                return recipes;
            });
    }
    
}