import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from "./../recipe.model";
import { RecipeService } from "app/services/recipe.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import * as fromRecipe from '../store/recipe.reducers'
import * as recipeActions from '../store/recipe.actions'
import * as fromApp from 'app/store/app.reducers';
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>; 
  id: number;

  constructor(private recipeService: RecipeService,
              private store: Store<fromRecipe.FeatureState>,
              private router: Router, 
              private route: ActivatedRoute) {     
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipeState = this.store.select('recipes');
    });
  }

  addIngredientsToShoppingList(){
    this.store.select('recipes')
      .take(1)
      .subscribe((recipeState: fromRecipe.State) => {
        this.recipeService.addIngredientsToShoppingList(recipeState.recipes[this.id].ingredients);    
      });    
  }

  onDeleteRecipe(){
    this.store.dispatch(new recipeActions.DeleteRecipes(this.id));
    //this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
