import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from "./../../services/recipe.service";
import { Subscription } from "rxjs/Subscription";
import { Store } from "@ngrx/store";
import * as fromRecipe from '../store/recipe.reducers'
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  /* recipes: Recipe[]; */
  recipeState: Observable<fromRecipe.State>; 

  constructor(private store: Store<fromRecipe.FeatureState>) { 
  }

  ngOnInit() {
    /*
    this.recipes = this.recipeService.getRecipes();

    this.subscription = this.recipeService.recipesChanged.subscribe((recipeList: Recipe[]) => {
      this.recipes = recipeList;
    });
    */
    this.recipeState = this.store.select('recipes');
  }

}
