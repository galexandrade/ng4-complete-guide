import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from "app/shared/ingredient.model";
import { ShoppingListService } from "app/services/shopping-list.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') 
  form: NgForm;
  subscription: Subscription;  
  editMode: boolean = false;
  editedItemId: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe((id: number) => {
      this.editMode = true;
      this.editedItemId = id;
      this.editedItem = this.shoppingListService.getIngredient(this.editedItemId);

      this.form.reset();
      this.form.setValue({
        'name': this.editedItem.name,
        'amount': this.editedItem.amount
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm){
    let ingredient = new Ingredient(form.value.name, form.value.amount);
    if(this.editMode)
      this.shoppingListService.updateIngredient(this.editedItemId, ingredient);
    else
      this.shoppingListService.addIngredient(ingredient);
    
    this.onClear();
  }

  onClear(){
    this.form.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemId);
    this.onClear();
  }
}
