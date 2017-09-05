import * as RecipeActions from './recipe.actions'; 

import { Recipe } from "app/recipes/recipe.model";
import { Ingredient } from "app/shared/ingredient.model";
import * as fromApp from 'app/store/app.reducers';

export interface FeatureState extends fromApp.AppState {
    recipes: State
}

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
        new Recipe('30-Minute Pressure Cooker Chicken...', 
                    'Tasty very gooood...', 
                    'http://www.seriouseats.com/images/2015/09/20150914-pressure-cooker-recipes-roundup-09.jpg',
                    [new Ingredient('Bread', 5)]),
        new Recipe('Pressure Cooker French Onion Soup', 
                    'Tasty very gooood...', 
                    'http://www.seriouseats.com/images/2017/02/20170228-pressure-cooker-recipes-roundup-04.jpg',
                    [new Ingredient('Onions', 5)])
    ]
}

export function recipeReducer(state = initialState, action){
    switch (action.type) {
        case RecipeActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };
        case RecipeActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case RecipeActions.UPDATE_RECIPE:
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.recipe
            };
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;

            return {
                ...state,
                recipes: recipes
            };
        case RecipeActions.DELETE_RECIPE:
            const oldRecipes = [...state.recipes];
            oldRecipes.splice(action.payload, 1);

            return {
                ...state,
                recipes: oldRecipes
            };
        default:
            return state;
    }
}