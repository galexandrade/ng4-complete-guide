import { Component, OnInit } from '@angular/core';
import { Recipe } from "./recipe.model";
import { RecipeService } from "app/services/recipe.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
