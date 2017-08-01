import { Input, Component, OnInit } from '@angular/core';
import { Recipe } from "../../recipe.model";
import { RecipeService } from "app/services/recipe.service";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input()
  recipe: Recipe;

  @Input()
  id: number;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

}
