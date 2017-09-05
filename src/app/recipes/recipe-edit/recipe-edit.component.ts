import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Routes, Router } from "@angular/router";
import { RecipeService } from "app/services/recipe.service";
import { Recipe } from "app/recipes/recipe.model";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";

import * as fromRecipe from '../store/recipe.reducers'
import * as recipeActions from '../store/recipe.actions'
import * as fromApp from 'app/store/app.reducers';
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean;
  recipe: Recipe;
  recipeForm: FormGroup;

  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private store: Store<fromRecipe.FeatureState>,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;

      if(this.editMode){
        this.store.select('recipes')
          .take(1)
          .subscribe((recipeState: fromRecipe.State) => {
            this.recipe = recipeState.recipes[this.id];
            this.initForm();
          });
      }
      else
        this.initForm();
    });
  }

  onSubmit(){
    if(this.editMode)
      //this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.store.dispatch(new recipeActions.UpdateRecipes({index: this.id, recipe: this.recipeForm.value}));
    else
      //this.recipeService.addRecipe(this.recipeForm.value);
      this.store.dispatch(new recipeActions.AddRecipes(this.recipeForm.value));
    
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm(){
    let recipeIngredients = new FormArray([]);
    if(this.editMode &&   this.recipe.ingredients){
      this.recipe.ingredients.forEach(ingredient => {
        recipeIngredients.push(new FormGroup({
          'name': new FormControl(ingredient.name, Validators.required),
          'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        }));
      });
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(this.editMode ? this.recipe.name : '', [Validators.required]),
      'imagePath': new FormControl(this.editMode ? this.recipe.imagePath : '', [Validators.required]),
      'description': new FormControl(this.editMode ? this.recipe.description : '', [Validators.required]),
      'ingredients': recipeIngredients
    });
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  getFormIngredients() { 
    return (<FormArray>this.recipeForm.get('ingredients')).controls; 
  }

}
