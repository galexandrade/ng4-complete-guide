import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from "app/shared/ingredient.model";
import { ShoppingListService } from "app/services/shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput')
  ingredientName: ElementRef;
  @ViewChild('amountInput')
  ingredientAmount: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddIngredient(){
    let ingredient = new Ingredient(this.ingredientName.nativeElement.value, this.ingredientAmount.nativeElement.value);
    this.shoppingListService.addIngredient(ingredient);
    this.onClear();
  }

  onClear(){
    this.ingredientName.nativeElement.value = "";
    this.ingredientAmount.nativeElement.value = "";
  }

}
