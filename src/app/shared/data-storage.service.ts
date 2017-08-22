import { Injectable } from "@angular/core";
import { RecipeService } from "app/services/recipe.service";
import 'rxjs/Rx';
import { Recipe } from "app/recipes/recipe.model";
import { AuthService } from "app/auth/auth.service";
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";

@Injectable()
export class DataStorage {
    constructor(private http: HttpClient, 
                private recipeService: RecipeService, 
                private authService: AuthService){}

    storeRecipes(){
        const token = this.authService.getToken();
        /*
        return this.http.put("https://ng-recipe-book-d42fc.firebaseio.com/recipes.json?auth=" + token, this.recipeService.getRecipes(), {
            observe: 'events'
        });
        */

        const req = new HttpRequest('PUT', 
                                    'https://ng-recipe-book-d42fc.firebaseio.com/recipes.json', 
                                    this.recipeService.getRecipes(), {
                                        reportProgress: true
                                        //params: new HttpParams().set('auth', token)  //Doing it by interceptors
                                    });

        return this.http.request(req);                        
    }

    fetchRecipes(){
        const token = this.authService.getToken();
        const headers = new HttpHeaders().set('Authorization', 'Bearer dsadsadsadsa');
        
        return this.http.get<Recipe[]>("https://ng-recipe-book-d42fc.firebaseio.com/recipes.json", {
        //return this.http.get("https://ng-recipe-book-d42fc.firebaseio.com/recipes.json?auth=" + token, {
            observe: 'body', //events
            responseType: 'json'
            //params: new HttpParams().set('auth', token) //Doing it by interceptors
            //headers: headers
        })        
        .map((recipes) => {
            //const recipes: Recipe[] = response.json();
            recipes.forEach(recipe => {
                if(!recipe.ingredients)
                    recipe.ingredients = [];
            });
            return recipes;
        });
    }
    
}