import { Effect, Actions } from '@ngrx/effects';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";
import { Router } from "@angular/router";
import * as firebase from 'firebase';
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { fromPromise } from 'rxjs/observable/fromPromise';
import * as RecipeActions from './recipe.actions';
import * as fromRecipe from './recipe.reducers';
import { Recipe } from "app/recipes/recipe.model";
import { Store } from "@ngrx/store";


@Injectable()
export class RecipeEffects {
    @Effect()
    recipeFetch = this.actions$
        .ofType(RecipeActions.FETCH_RECIPES)
        .switchMap((action: RecipeActions.FetchRecipes) => {
            return this.http.get<Recipe[]>("https://ng-recipe-book-d42fc.firebaseio.com/recipes.json", {
                    observe: 'body', //events
                    responseType: 'json'
                });                 
        })
        .map((recipes) => {
            recipes.forEach(recipe => {
                if(!recipe.ingredients)
                    recipe.ingredients = [];
            });
            return {
                type: RecipeActions.SET_RECIPES,
                payload: recipes
            };
        });

    @Effect({dispatch: false})
    recipeStore = this.actions$
        .ofType(RecipeActions.STORE_RECIPES)
        .withLatestFrom(this.store.select('recipes'))
        .switchMap(([action, state]) => {
            const req = new HttpRequest('PUT', 
                'https://ng-recipe-book-d42fc.firebaseio.com/recipes.json', 
                state.recipes, {
                    reportProgress: true
                    //params: new HttpParams().set('auth', token)  //Doing it by interceptors
                });

            return this.http.request(req);                  
        });
            
    constructor(private actions$: Actions, 
                private http: HttpClient,
                private store: Store<fromRecipe.FeatureState>){}
}