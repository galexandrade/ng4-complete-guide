import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('30-Minute Pressure Cooker Chicken...', 'Tasty gooood...', 'http://www.seriouseats.com/images/2015/09/20150914-pressure-cooker-recipes-roundup-09.jpg'),
    new Recipe('Pressure Cooker French Onion Soup', 'Tasty very gooood...', 'http://www.seriouseats.com/images/2017/02/20170228-pressure-cooker-recipes-roundup-04.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
