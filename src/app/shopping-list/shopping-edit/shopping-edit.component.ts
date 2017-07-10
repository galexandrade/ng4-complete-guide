import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from "app/shared/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output()
  addIngredient = new EventEmitter<Ingredient>();

  @ViewChild('nameInput')
  ingredientName: ElementRef;
  @ViewChild('amountInput')
  ingredientAmount: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  onAddIngredient(){
    let ingredient = new Ingredient(this.ingredientName.nativeElement.value, this.ingredientAmount.nativeElement.value);
    this.addIngredient.emit(ingredient);
    this.onClear();
  }

  onClear(){
    this.ingredientName.nativeElement.value = "";
    this.ingredientAmount.nativeElement.value = "";
  }

}
