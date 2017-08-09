import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from "./../../services/recipe.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeService: RecipeService) { 
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();

    this.subscription = this.recipeService.recipesChanged.subscribe((recipeList: Recipe[]) => {
      this.recipes = recipeList;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
